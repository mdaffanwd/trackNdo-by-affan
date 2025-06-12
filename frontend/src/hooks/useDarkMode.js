import React, { useEffect, useState } from 'react'

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage on first load
    return localStorage.theme === 'dark' ||
      (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    const html = document.documentElement
    const body = document.body;
    // console.log(document.body)
    if (isDark) {
      html.classList.add('dark')
      // body.classList.add('transition-colors duration-700')
      localStorage.theme = 'dark'
    } else {
      html.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }, [isDark])

  // Return the state and a toggle function
  const toggleDarkMode = () => setIsDark((prev) => !prev)

  return [isDark, toggleDarkMode]

}
