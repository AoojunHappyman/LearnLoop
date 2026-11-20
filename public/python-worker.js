let runtime;
self.onmessage = async ({data}) => {
  try {
    if (!runtime) {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js');
      runtime = await loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/'});
      await runtime.loadPackage(['numpy','pandas']);
    }
    runtime.globals.set('student_code', data.code);
    runtime.globals.set('test_cases_json', JSON.stringify(data.tests));
    const results = await runtime.runPythonAsync(`
import ast, contextlib, io, json, tempfile, os
results = []
for case in json.loads(test_cases_json):
    output = io.StringIO()
    previous = os.getcwd()
    try:
        with tempfile.TemporaryDirectory() as folder:
            try:
                os.chdir(folder)
                namespace = {"__name__": "__main__"}
                with contextlib.redirect_stdout(output):
                    exec(student_code, namespace)
                    exec(case["input"], namespace)
            finally:
                os.chdir(previous)
        actual = output.getvalue().strip()
        expected = case["output"].strip()
        passed = actual == expected
        if not passed:
            try:
                passed = ast.literal_eval(actual) == ast.literal_eval(expected)
            except (ValueError, SyntaxError):
                pass
        results.append({"passed": bool(passed), "actual": actual})
    except Exception as error:
        results.append({"passed": False, "actual": type(error).__name__ + ": " + str(error)})
json.dumps(results)
`);
    self.postMessage({results:JSON.parse(results)});
  } catch(error) { self.postMessage({error:String(error)}); }
};
