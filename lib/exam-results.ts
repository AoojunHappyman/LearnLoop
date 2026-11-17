export function attemptKey(id: string) {
  return 'learnloop:exam:' + (id === 'itds120-mock' ? 'itds120-final' : id) + ':v1'
}
