import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LaunchPage from './pages/LaunchPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'

function MobileViewportFix() {
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      if (vw > 450) return

      // zoom 值：让 402px 容器适配屏幕宽度
      const zoom = vw / 402

      // 真实视口高度（排除 Safari 地址栏/工具栏）
      const realVH = (window.visualViewport && window.visualViewport.height) || window.innerHeight

      // 容器 zoom 后的实际高度
      const containerScreenHeight = 852 * zoom

      // 如果超出视口，减小 zoom 让容器完整显示
      if (containerScreenHeight > realVH) {
        const fitZoom = realVH / 852
        document.documentElement.style.setProperty('--mobile-zoom', fitZoom)
      } else {
        document.documentElement.style.setProperty('--mobile-zoom', zoom)
      }
    }

    update()
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', update)
      window.visualViewport.addEventListener('scroll', update)
    }
    window.addEventListener('resize', update)

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', update)
        window.visualViewport.removeEventListener('scroll', update)
      }
      window.removeEventListener('resize', update)
    }
  }, [])

  return null
}

function DesktopScaler() {
  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth <= 450) return
      const designHeight = 852
      const viewHeight = window.innerHeight
      const scale = Math.min(1, (viewHeight - 40) / designHeight)
      document.documentElement.style.setProperty('--desktop-scale', scale)
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <MobileViewportFix />
      <DesktopScaler />
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
