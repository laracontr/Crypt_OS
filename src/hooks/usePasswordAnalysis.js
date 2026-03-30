import { useState, useCallback } from 'react'
import * as zxcvbn from 'zxcvbn'

export function usePasswordAnalysis(password) {
  const [hibpResult, setHibpResult] = useState(null)
  const [hibpLoading, setHibpLoading] = useState(false)

  const analyze = useCallback(() => {
    if (!password) return null
    return zxcvbn(password)
  }, [password])

  const result = analyze()

  const charsetSize = useCallback(() => {
    let s = 0
    if (/[a-z]/.test(password)) s += 26
    if (/[A-Z]/.test(password)) s += 26
    if (/[0-9]/.test(password)) s += 10
    if (/[^a-zA-Z0-9]/.test(password)) s += 32
    return s || 1
  }, [password])

  const entropy = useCallback(() => {
    if (!password) return 0
    return (Math.log2(charsetSize()) * password.length).toFixed(2)
  }, [password, charsetSize])

  const checkHIBP = useCallback(async () => {
    if (!password) return
    setHibpLoading(true)
    
    try {
      const hash = await sha1(password)
      const prefix = hash.slice(0, 5)
      const suffix = hash.slice(5)

      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
      const txt = await res.text()

      const lines = txt.split('\n')
      let found = 0
      for (const line of lines) {
        const [h, cnt] = line.trim().split(':')
        if (h === suffix) { found = parseInt(cnt); break; }
      }

      setHibpResult({ found, error: null })
    } catch (e) {
      setHibpResult({ found: null, error: e.message })
    } finally {
      setHibpLoading(false)
    }
  }, [password])

  return {
    result,
    entropy: entropy(),
    charsetSize: charsetSize(),
    hibpResult,
    hibpLoading,
    checkHIBP,
    isEmpty: !password
  }
}

async function sha1(str) {
  const enc = new TextEncoder().encode(str)
  const hash = await crypto.subtle.digest('SHA-1', enc)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2,'0'))
    .join('').toUpperCase()
}
