import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './LaunchPage.css'

function LaunchPage() {
  const navigate = useNavigate()
  const [fading, setFading] = useState(false)

  const handleCreate = () => {
    setFading(true)
    setTimeout(() => navigate('/home'), 600)
  }

  return (
    <div className={`phone-frame${fading ? ' fade-out' : ''}`}>
      {/* 背景渐变层 */}
      <div className="bg-gradient" />

      {/* 插画背景层 */}
      <div className="bg-illustration">
        <img
          src="/bg-illustration.webp"
          alt="梦幻花林插画"
          className="bg-illustration-img"
        />
      </div>

      {/* 花瓣飘落层 */}
      <div className="petal-layer">
        <div className="petal" />
        <div className="petal" />
        <div className="petal" />
        <div className="petal" />
        <div className="petal" />
        <div className="petal" />
        <div className="petal" />
        <div className="petal" />
        <div className="petal" />
        <div className="petal" />
        <div className="petal" />
        <div className="petal" />
      </div>

      {/* 标题区域 - 页面上部1/3 */}
      <div className="title-section">
        <h1 className="title-text">
          让思念.
          <br />
          像花一样花绽放
        </h1>
        <p className="date-text">{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}</p>
      </div>

      {/* 底部按钮区域 */}
      <div className="bottom-section">
        <button className="create-btn" onClick={handleCreate}>
          创建空间
        </button>
      </div>
    </div>
  )
}

export default LaunchPage
