import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'


function HomePage() {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const [inputFocused, setInputFocused] = useState(false)

  return (
    <div className="homepage">
      {/* ===== 顶部背景图 ===== */}
      <div className="header-bg">
        <img
          className="header-bg-img"
          src="/header-bg.webp"
          alt=""
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>

      {/* ===== 渐变遮罩 ===== */}
      <div className="header-gradient" />

      {/* ===== 顶部内容：头像 + hi + mail/search ===== */}
      <div className="header-content">
        <div className="header-left">
          <div className="avatar-wrap">
            <img
              className="avatar"
              src="/avatar.webp"
              alt=""
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.classList.add('placeholder-img')
                e.target.parentElement.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#fff" stroke-width="2"/><path d="M4 22C4 17.58 7.58 14 12 14C16.42 14 20 17.58 20 22" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>'
              }}
            />
          </div>
          <span className="greeting-text">hi，Gaby</span>
        </div>
        <div className="header-actions">
          {/* Search icon */}
          <div className="icon-btn search-btn">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.875 14.25C11.3958 14.25 14.25 11.3958 14.25 7.875C14.25 4.3542 11.3958 1.5 7.875 1.5C4.3542 1.5 1.5 4.3542 1.5 7.875C1.5 11.3958 4.3542 14.25 7.875 14.25Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
              <path d="M12.4581 12.4581L15.6401 15.6401" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          {/* Mail icon + badge */}
          <div className="icon-btn mail-btn">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.58331 15.4375H17.4166V9.5V3.5625H9.49998H1.58331V9.5V15.4375Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
              <path d="M1.58331 3.5625L9.49998 9.5L17.4166 3.5625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.49998 3.5625H1.58331V9.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.4167 9.5V3.5625H9.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span className="badge">10</span>
          </div>
        </div>
      </div>

      {/* ===== 白色卡片（固定不动） ===== */}
      <div className="white-card" />

      {/* ===== 输入框区（固定在白色卡片上方） ===== */}
      <div className="input-section">
        <div className="input-left">
          <span className="miss-label">想念TA的</span>
          <div className="miss-number-wrap"><span className="miss-number">382</span><span className="miss-day">天</span></div>
        </div>
        <div className="input-box-wrap">
          <div className="input-box">
            {inputValue ? (
              <input
                className="input-field"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={() => setInputFocused(false)}
                autoFocus={inputFocused}
              />
            ) : (
              <input
                className="input-field"
                type="text"
                value=""
                placeholder="今天，我想对TA说..."
                onFocus={() => setInputFocused(true)}
                onChange={(e) => { setInputValue(e.target.value); setInputFocused(true) }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ===== 可滚动内容区 ===== */}
      <div className="content">
        {/* ===== 想念区块 ===== */}
        <div className="section miss-section">
          <div className="section-header">
            <h2 className="section-title">想念</h2>
            <span className="section-more">更多</span>
          </div>
          <div className="miss-cards">
            {/* 视频卡片 (Broadcast-radio) */}
            <div className="miss-card">
              <svg className="miss-card-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M29.3333 8H2.66663V26.6667H29.3333V8Z" fill="#E6CAAC" stroke="#562828" strokeWidth="3" strokeLinejoin="round"/>
                <path d="M20.6667 20.6667C22.5076 20.6667 24 19.1743 24 17.3333C24 15.4924 22.5076 14 20.6667 14C18.8258 14 17.3334 15.4924 17.3334 17.3333C17.3334 19.1743 18.8258 20.6667 20.6667 20.6667Z" fill="#562828" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
                <path d="M8 14.6667H12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 20H12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33337 26.6667V29.3334" stroke="#562828" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26.6666 26.6667V29.3334" stroke="#562828" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33337 8.00002L24 2.66669" stroke="#562828" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="miss-card-label">视频</span>
            </div>
            {/* 照片卡片 (Camera) */}
            <div className="miss-card">
              <svg className="miss-card-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M10 8L12 4H20L22 8H10Z" fill="#E6CAAC" stroke="#562828" strokeWidth="3" strokeLinejoin="round"/>
                <path d="M27.3333 8H4.66663C3.56206 8 2.66663 8.89543 2.66663 10V26C2.66663 27.1046 3.56206 28 4.66663 28H27.3333C28.4379 28 29.3333 27.1046 29.3333 26V10C29.3333 8.89543 28.4379 8 27.3333 8Z" fill="#E6CAAC" stroke="#562828" strokeWidth="3" strokeLinejoin="round"/>
                <path d="M16 23.3334C18.9455 23.3334 21.3333 20.9456 21.3333 18C21.3333 15.0545 18.9455 12.6667 16 12.6667C13.0544 12.6667 10.6666 15.0545 10.6666 18C10.6666 20.9456 13.0544 23.3334 16 23.3334Z" fill="#562828" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
              </svg>
              <span className="miss-card-label">照片</span>
            </div>
            {/* 声音卡片 (Volume-notice) */}
            <div className="miss-card">
              <svg className="miss-card-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4V28C11.3334 28 7.86569 21.8927 7.86569 21.8927H4.00002C3.26364 21.8927 2.66669 21.2958 2.66669 20.5594V11.3405C2.66669 10.6041 3.26364 10.0072 4.00002 10.0072H7.86569C7.86569 10.0072 11.3334 4 16 4Z" fill="#E6CAAC" stroke="#562828" strokeWidth="3" strokeLinejoin="round"/>
                <path d="M21.3333 10C21.7488 10.371 22.1254 10.7865 22.456 11.2392C23.4258 12.5669 24 14.2149 24 16C24 17.7697 23.4356 19.4045 22.4812 20.7262C22.1445 21.1923 21.7594 21.6195 21.3333 22" stroke="#562828" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22.8239 27.4571C26.7224 25.1302 29.3333 20.87 29.3333 16C29.3333 11.2057 26.8028 7.00234 23.0046 4.65271" stroke="#562828" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <span className="miss-card-label">声音</span>
            </div>
          </div>
        </div>

        {/* ===== 那年区块 ===== */}
        <div className="section year-section">
          <div className="section-header">
            <h2 className="section-title">那年</h2>
          </div>
          <div className="year-photo-frame">
            <div className="year-photo year-photo-1">
              <img
                src="/year-photo1.webp"
                alt=""
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="year-photo-placeholder" style="position:absolute;top:0;left:0;width:100%;height:100%;background:#d4c5b5;display:flex;align-items:center;justify-content:center"><svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="#562828" stroke-width="2"/><circle cx="8" cy="8" r="2" stroke="#562828" stroke-width="2"/><path d="M2 16L8 10L14 16L18 12L22 16" stroke="#562828" stroke-width="2"/></svg></div>'
                }}
              />
            </div>
            <div className="year-photo year-photo-2">
              <img
                src="/year-photo2.webp"
                alt=""
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="year-photo-placeholder" style="position:absolute;top:0;left:0;width:100%;height:100%;background:#c9baa6;display:flex;align-items:center;justify-content:center"><svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="#562828" stroke-width="2"/><circle cx="8" cy="8" r="2" stroke="#562828" stroke-width="2"/><path d="M2 16L8 10L14 16L18 12L22 16" stroke="#562828" stroke-width="2"/></svg></div>'
                }}
              />
            </div>
            <div className="year-photo year-photo-3">
              <img
                src="/year-photo3.webp"
                alt=""
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="year-photo-placeholder" style="position:absolute;top:0;left:0;width:100%;height:100%;background:#bdb0a0;display:flex;align-items:center;justify-content:center"><svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="#562828" stroke-width="2"/><circle cx="8" cy="8" r="2" stroke="#562828" stroke-width="2"/><path d="M2 16L8 10L14 16L18 12L22 16" stroke="#562828" stroke-width="2"/></svg></div>'
                }}
              />
            </div>
          </div>
        </div>

        {/* ===== 动态区块 ===== */}
        <div className="section feed-section">
          <div className="section-header">
            <h2 className="section-title">动态</h2>
          </div>

          {/* Merry 评论 */}
          <div className="feed-card">
            <div className="feed-avatar-wrap">
              <img
                className="feed-avatar"
                src="/merry-avatar.webp"
                alt=""
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="feed-avatar-placeholder"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#562828" stroke-width="2"/><path d="M4 22C4 17.58 7.58 14 12 14C16.42 14 20 17.58 20 22" stroke="#562828" stroke-width="2"/></svg></div>'
                }}
              />
            </div>
            <div className="feed-content">
              <span className="feed-name">Merry</span>
              <p className="feed-text">评论了2022年的照片："那天的龙神忙到直接在录音室睡着了"</p>
              <div className="feed-bottom">
                <span className="feed-time">上午 10:43</span>
              </div>
            </div>
            <div className="feed-photo-wrap">
              <img
                className="feed-photo"
                src="/merry-photo.webp"
                alt=""
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="feed-photo-placeholder"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="#562828" stroke-width="2"/><circle cx="8" cy="8" r="2" stroke="#562828" stroke-width="2"/><path d="M2 16L8 10L14 16L18 12L22 16" stroke="#562828" stroke-width="2"/></svg></div>'
                }}
              />
            </div>
          </div>
          <div className="feed-divider" />

          {/* Lisa 评论 */}
          <div className="feed-card feed-card-last">
            <div className="feed-avatar-wrap">
              <img
                className="feed-avatar"
                src="/josphine-avatar.webp"
                alt=""
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="feed-avatar-placeholder"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#562828" stroke-width="2"/><path d="M4 22C4 17.58 7.58 14 12 14C16.42 14 20 17.58 20 22" stroke="#562828" stroke-width="2"/></svg></div>'
                }}
              />
            </div>
            <div className="feed-content">
              <span className="feed-name">Lisa</span>
              <p className="feed-text">每次看到版本老师戴着耳机沉醉工作的黑白照片就让人很敬佩。</p>
              <div className="feed-bottom">
                <span className="feed-time">昨天</span>
              </div>
            </div>
            <div className="feed-photo-wrap">
              <img
                className="feed-photo"
                src="/josphine-photo.webp"
                alt=""
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="feed-photo-placeholder"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="#562828" stroke-width="2"/><circle cx="8" cy="8" r="2" stroke="#562828" stroke-width="2"/><path d="M2 16L8 10L14 16L18 12L22 16" stroke="#562828" stroke-width="2"/></svg></div>'
                }}
              />
            </div>
          </div>
          <div className="feed-divider" />

          {/* Merry 评论 */}
          <div className="feed-card feed-card-last">
            <div className="feed-avatar-wrap">
              <img
                className="feed-avatar"
                src="/merry-avatar.webp"
                alt=""
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="feed-avatar-placeholder"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#562828" stroke-width="2"/><path d="M4 22C4 17.58 7.58 14 12 14C16.42 14 20 17.58 20 22" stroke="#562828" stroke-width="2"/></svg></div>'
                }}
              />
            </div>
            <div className="feed-content">
              <span className="feed-name">Merry</span>
              <p className="feed-text">评论了2022年的照片："那天的龙神忙到直接在录音室睡着了"</p>
              <div className="feed-bottom">
                <span className="feed-time">上午 10:43</span>
              </div>
            </div>
            <div className="feed-photo-wrap">
              <img
                className="feed-photo"
                src="/merry-photo.webp"
                alt=""
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="feed-photo-placeholder"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="#562828" stroke-width="2"/><circle cx="8" cy="8" r="2" stroke="#562828" stroke-width="2"/><path d="M2 16L8 10L14 16L18 12L22 16" stroke="#562828" stroke-width="2"/></svg></div>'
                }}
              />
            </div>
          </div>
          <div className="feed-divider" />

          {/* Lisa 评论 */}
          <div className="feed-card feed-card-last">
            <div className="feed-avatar-wrap">
              <img
                className="feed-avatar"
                src="/josphine-avatar.webp"
                alt=""
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="feed-avatar-placeholder"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#562828" stroke-width="2"/><path d="M4 22C4 17.58 7.58 14 12 14C16.42 14 20 17.58 20 22" stroke="#562828" stroke-width="2"/></svg></div>'
                }}
              />
            </div>
            <div className="feed-content">
              <span className="feed-name">Lisa</span>
              <p className="feed-text">每次看到版本老师戴着耳机沉醉工作的黑白照片就让人很敬佩。</p>
              <div className="feed-bottom">
                <span className="feed-time">昨天</span>
              </div>
            </div>
            <div className="feed-photo-wrap">
              <img
                className="feed-photo"
                src="/josphine-photo.webp"
                alt=""
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="feed-photo-placeholder"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="#562828" stroke-width="2"/><circle cx="8" cy="8" r="2" stroke="#562828" stroke-width="2"/><path d="M2 16L8 10L14 16L18 12L22 16" stroke="#562828" stroke-width="2"/></svg></div>'
                }}
              />
            </div>
          </div>
          <div className="feed-divider" />
        </div>
      </div>

      {/* ===== 底部Tab栏（固定不动） ===== */}
      <div className="tab-bar">
        <div className="tab-item active" title="首页">
          <svg width="24" height="23" viewBox="0 0 24 23" fill="none">
            <path d="M3 9L12 2L21 9V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V9Z" stroke="#FFF2E1" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M9 21V14H15V21" stroke="#FFF2E1" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="tab-item" onClick={() => navigate('/')} title="返回启动页">
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none">
              <path d="M11.2653 1.78207C6.0806 1.78207 1.87756 5.73152 1.87756 10.6034V19.6029H20.6531V10.6034C20.6531 5.73152 16.45 1.78207 11.2653 1.78207Z" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.2653 16.0387C14.3762 16.0387 16.898 13.6452 16.898 10.6925C16.898 7.73985 14.3762 5.34625 11.2653 5.34625C8.15452 5.34625 5.63269 7.73985 5.63269 10.6925C5.63269 13.6452 8.15452 16.0387 11.2653 16.0387Z" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.2653 8.01938V10.6925L13.1428 12.4746" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="tab-item" onClick={() => navigate('/profile')}>
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none">
              <path d="M8.91833 7.12833C9.01038 6.17363 9.49817 3.94604 11.2653 2.67313C11.9095 3.41566 13.3913 5.34625 13.6122 7.12833" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.1491 18.7119C7.17348 18.0639 -0.141499 13.9489 2.40285 2.67313C5.75996 3.40216 12.2092 7.63057 11.1491 18.7119Z" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.3815 18.7119C15.3571 18.0639 22.6721 13.9489 20.1277 2.67313C16.7706 3.40216 10.3214 7.63057 11.3815 18.7119Z" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
      </div>
    </div>
  )
}

export default HomePage
