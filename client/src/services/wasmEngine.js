let wasmInstance = null

export async function initWasmEngine() {
  if (wasmInstance) return wasmInstance
  try {
    const response = await fetch('/wasm/sanskrit_lab_backend.wasm')
    const bytes = await response.arrayBuffer()
    const { instance } = await WebAssembly.instantiate(bytes, {})
    wasmInstance = instance.exports
    console.log('Rust WebAssembly Engine loaded successfully.')
    return wasmInstance
  } catch (err) {
    console.warn('WASM initialization fallback to JS engine:', err)
    return null
  }
}

export function getWasmEngine() {
  return wasmInstance
}
