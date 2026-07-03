import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [specialAllowed, setSpecialAllowed] = useState(false)
  const [copied, setCopied] = useState(false)
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllowed) {
      characters += '0123456789'
    }
    if (specialAllowed) {
      characters += '!@#$%^&*()_+~`|}{[]:;?><,./-='
    }

    let pass = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      pass += characters[randomIndex]
    }

    setPassword(pass)
    setCopied(false)
  }, [length, numberAllowed, specialAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, specialAllowed, passwordGenerator])

  const copyToClipboard = async () => {
    if (!password) return

    if (navigator.clipboard) {
      passwordRef.current?.focus()
      passwordRef.current?.select()
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-black px-4 py-10'>
      <section className='w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl'>
        <div className='space-y-3 text-center'>
          <h1 className='text-3xl font-bold text-slate-900'>Password Generator</h1>
          <p className='text-sm text-slate-600'>Generate a secure password and copy it for later use.</p>
        </div>

        <div className='mt-8 space-y-5'>
          <div className='rounded-3xl bg-slate-100 p-5'>
            <input
              ref={passwordRef}
              type='text'
              value={password}
              readOnly
              placeholder='Your password will appear here'
              className='w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-slate-500 focus:outline-none'
            />
          </div>

          <div className='rounded-3xl bg-slate-100 p-5'>
            <p className='text-sm font-medium text-slate-700'>Password options</p>
            <div className='mt-4 grid gap-3'>
              <label className='flex items-center gap-3 rounded-2xl border border-slate-300 bg-white p-4'>
                <input
                  type='checkbox'
                  checked={numberAllowed}
                  onChange={() => setNumberAllowed((prev) => !prev)}
                  className='h-4 w-4 accent-slate-900'
                />
                <span className='text-sm text-slate-700'>Include numbers</span>
              </label>

              <label className='flex items-center gap-3 rounded-2xl border border-slate-300 bg-white p-4'>
                <input
                  type='checkbox'
                  checked={specialAllowed}
                  onChange={() => setSpecialAllowed((prev) => !prev)}
                  className='h-4 w-4 accent-slate-900'
                />
                <span className='text-sm text-slate-700'>Include special characters</span>
              </label>

              <div className='rounded-2xl border border-slate-300 bg-white p-4'>
                <div className='flex items-center justify-between text-sm text-slate-700'>
                  <span>Password Length</span>
                  <span className='font-semibold text-slate-900'>{length}</span>
                </div>
                <input
                  type='range'
                  min='6'
                  max='24'
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value, 10))}
                  className='mt-3 h-2 w-full cursor-pointer accent-slate-900'
                />
              </div>
            </div>
          </div>

          <div className='grid gap-3'>
            <button
              type='button'
              onClick={copyToClipboard}
              className='w-full rounded-3xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-700'
            >
              {copied ? 'Copied!' : 'Copy password'}
            </button>
            <button
              type='button'
              onClick={passwordGenerator}
              className='w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 transition hover:bg-slate-50'
            >
              Generate password
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
// added comment