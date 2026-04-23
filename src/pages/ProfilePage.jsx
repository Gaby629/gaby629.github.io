import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProfilePage.css'

/* 花朵SVG图标（送花按钮用，白色） */
function BloomIcon({ size = 29 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 29 29" fill="none">
      <path d="M3.625 19.3333L10.875 25.375" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M25.375 19.3333L18.125 25.375" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.5 19.3333V26.5833" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.2708 6.64583L14.5 2.41667L18.7292 6.64583L22.9583 6.04167C22.9583 6.04167 23.5625 8.60249 23.5625 10.2708C23.5625 16.3125 18.4271 19.3333 14.5 19.3333C10.5729 19.3333 5.4375 16.3125 5.4375 10.2708C5.4375 8.60249 6.04167 6.04167 6.04167 6.04167L10.2708 6.64583Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* 小花朵图标（留言卡片的bloom按钮，深色） */
function BloomSmall({ size = 19 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 19 19" fill="none">
      <path d="M2.375 12.6667L7.125 16.625" stroke="#562828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.625 12.6667L11.875 16.625" stroke="#562828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 12.6667V17.4167" stroke="#562828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.72917 4.35416L9.5 1.58333L12.2708 4.35416L15.0417 3.95833C15.0417 3.95833 15.4375 5.63611 15.4375 6.72916C15.4375 10.6875 12.0729 12.6667 9.5 12.6667C6.92708 12.6667 3.5625 10.6875 3.5625 6.72916C3.5625 5.63611 3.95833 3.95833 3.95833 3.95833L6.72917 4.35416Z" fill="#562828" stroke="#562828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ProfilePage() {
  const navigate = useNavigate()
  const [showBloomModal, setShowBloomModal] = useState(false)
  const [bloomVisible, setBloomVisible] = useState(false)
  const [selectedFlower, setSelectedFlower] = useState(null)
  const [showBloomGift, setShowBloomGift] = useState(false)
  const [giftPhase, setGiftPhase] = useState('') // 'appear' → 'sway' → 'exit'
  const [flowerCount, setFlowerCount] = useState(56)
  const [showBadge, setShowBadge] = useState(false)
  const photoScrollRef = useRef(null)

  // 照片横向滚动橡皮筋效果
  useEffect(() => {
    const el = photoScrollRef.current
    if (!el) return

    let startX = 0, startY = 0, currentX = 0, isDragging = false, isHorizontal = null
    const resistance = 0.3

    const onStart = (x, y) => {
      startX = x
      startY = y
      currentX = el.scrollLeft
      isDragging = true
      isHorizontal = null
      el.style.transition = 'none'
      el.style.overflowX = 'hidden'
    }

    const onMove = (x, y) => {
      if (!isDragging) return
      const dx = x - startX
      const dy = y - startY

      // 判断滑动方向
      if (isHorizontal === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        isHorizontal = Math.abs(dx) > Math.abs(dy)
      }
      if (!isHorizontal) {
        el.style.overflowX = ''
        el.scrollLeft = currentX
        return
      }

      const maxScroll = el.scrollWidth - el.clientWidth
      let offset = dx

      // 超出边界时施加阻力
      if ((currentX <= 0 && dx > 0) || (currentX >= maxScroll && dx < 0)) {
        offset = dx * resistance
      }

      el.scrollLeft = currentX - offset
    }

    const onEnd = () => {
      if (!isDragging) return
      isDragging = false
      el.style.transition = 'scroll-left 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
      el.style.overflowX = ''

      const maxScroll = el.scrollWidth - el.clientWidth
      // 弹回边界
      if (el.scrollLeft < 0) {
        el.scrollLeft = 0
      } else if (el.scrollLeft > maxScroll) {
        el.scrollLeft = maxScroll
      }

      setTimeout(() => { el.style.transition = '' }, 400)
    }

    // Touch 事件
    el.addEventListener('touchstart', e => onStart(e.touches[0].clientX, e.touches[0].clientY), { passive: true })
    el.addEventListener('touchmove', e => { if (isDragging) onMove(e.touches[0].clientX, e.touches[0].clientY) }, { passive: true })
    el.addEventListener('touchend', onEnd, { passive: true })
    el.addEventListener('touchcancel', onEnd, { passive: true })

    // Mouse 事件（桌面端调试）
    el.addEventListener('mousedown', e => onStart(e.clientX, e.clientY))
    window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY))
    window.addEventListener('mouseup', onEnd)

    return () => {
      el.removeEventListener('touchstart', () => {})
      el.removeEventListener('touchmove', () => {})
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
      el.removeEventListener('mousedown', () => {})
      window.removeEventListener('mousemove', () => {})
      window.removeEventListener('mouseup', onEnd)
    }
  }, [])

  // 打开浮层：先挂载 DOM，下一帧加 visible 触发动画
  const openBloomModal = () => {
    setShowBloomModal(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setBloomVisible(true))
    })
  }

  // 关闭浮层（非赠送，直接关闭）
  const closeBloomModal = () => {
    setBloomVisible(false)
    setTimeout(() => {
      setShowBloomModal(false)
      setSelectedFlower(null)
    }, 200)
  }

  // 赠送小红花：浮层渐隐 → 触发赠送动画（出现→摇摆→消失）
  const sendBloom = () => {
    if (selectedFlower !== '小红花') return
    setBloomVisible(false)
    setTimeout(() => {
      setShowBloomModal(false)
      setSelectedFlower(null)
      // 浮层消失后触发赠送动画
      setTimeout(() => {
        setShowBloomGift(true)
        setGiftPhase('')
        requestAnimationFrame(() => {
          // 阶段1：出现
          setGiftPhase('appear')
          // 阶段2：出现完成后开始摇摆
          setTimeout(() => setGiftPhase('sway'), 300)
          // 阶段3：摇摆几秒后消失（沙化粒子飘散）
          setTimeout(() => setGiftPhase('exit'), 2800)
          // 清理 DOM（等粒子飘完）→ 触发 +1 气泡
          setTimeout(() => {
            setShowBloomGift(false)
            setGiftPhase('')
            // 触发 +1 红色气泡动画
            setShowBadge(true)
            // 气泡消失后更新数字
            setTimeout(() => {
              setShowBadge(false)
              setFlowerCount(flowerCount + 1)
            }, 800)
          }, 5200)
        })
      }, 50)
    }, 200)
  }

  return (
    <div className="profile-page">
      {/* ===== 顶部背景图区 (Mask group: 406x201, top=0, left=-4) ===== */}
      <div className="profile-bg">
        <img className="profile-bg-img" src="/profile-bg.webp" alt="" onError={(e) => { e.target.style.display = 'none' }} />
        {/* 渐变遮罩 Rectangle 29: 441x129, top=91, left=-22 */}
        <div className="profile-bg-gradient" />
      </div>

      {/* ===== 返回按钮 (Left: 24x24, left=7, top=14) ===== */}
      <div className="nav-back" onClick={() => navigate('/home')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* ===== 访问统计 (top=133, left=282) ===== */}
      <div className="visit-info">
        <span>访问 289</span>
        <span className="visit-today">今日+10</span>
      </div>


      {/* ===== 白色圆角过渡区（与 HomePage 统一风格） ===== */}
      <div className="white-subtract" />

      {/* ===== 头像 (Ellipse 8: 62x62, left=28, top=132) ===== */}
      <div className="profile-avatar-wrap">
        <img className="profile-avatar" src="/profile-avatar.webp" alt=""
          onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('placeholder') }} />
      </div>

      {/* ===== 姓名 "坂本龙一" (22px/600, left=31, top=205) ===== */}
      <h1 className="profile-name">坂本龙一</h1>

      {/* ===== 花束图片 — 右边距对齐胶囊矩形 ===== */}
      <img className="flower-bouquet" src="/flower-bouquet.webp" alt=""
        onError={(e) => { e.target.style.display = 'none' }} />

      {/* ===== "71岁" (16px/400, left=140, top=211) ===== */}
      <span className="profile-age">71岁</span>

      {/* ===== 浅色统计条 Rectangle 24: 360x83, left=18, top=251 ===== */}
      <div className="stats-bar">
        {/* 左侧数字 "56" (Albert Sans 42px/700) */}
        <div className="stats-left">
          <div className="stats-number-wrap">
            <span className="stats-number">{flowerCount}</span>
            <div className={`red-badge ${showBadge ? 'red-badge-show' : ''}`}>
              <span>+1</span>
            </div>
          </div>
          <span className="stats-label">鲜花</span>
        </div>
        {/* 右侧数字 "20" */}
        <div className="stats-right">
          <span className="stats-number">20</span>
          <span className="stats-label">留言</span>
        </div>
      </div>

      {/* ===== 可滚动内容区域 ===== */}
      <div className="profile-content">

        {/* ===== 简介区块 ===== */}
        <div className="section section-intro">
          <div className="section-header">
            <h2 className="section-title">简介</h2>
            <span className="section-more">更多</span>
          </div>
          <p className="intro-text">
            坂本龙一（Ryuichi Sakamoto，1952年1月17日—2023年3月28日）是享誉世界的日本作曲家、钢琴家、制作人及演员，被誉为"新音乐教父"。他不仅是电子乐先驱乐队YMO成员，更以《末代皇帝》配乐获奥斯卡与格莱美奖，音乐风格融合电子、古典与民族元素，以空灵脱俗著称...
          </p>
        </div>

        {/* ===== 照片区块 ===== */}
        <div className="section section-photos">
          <div className="section-header">
            <h2 className="section-title">照片</h2>
          </div>
          <div className="photo-scroll" ref={photoScrollRef}>
            <div className="photo-row">
              {/* 5张照片 */}
              {[1, 2, 3, 4, 5].map(i => (
                <div className="photo-item" key={i}>
                  <img src={`/profile-photo${i}.webp`} alt="" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('photo-placeholder') }} />
                  <svg className="photo-placeholder-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="2" y="2" width="28" height="28" rx="4" stroke="#562828" strokeWidth="2" opacity="0.3"/>
                    <circle cx="11" cy="11" r="3" stroke="#562828" strokeWidth="2" opacity="0.3"/>
                    <path d="M2 24L9 17L15 23L22 16L30 24" stroke="#562828" strokeWidth="2" opacity="0.3"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== 时光区块 ===== */}
        <div className="section section-timeline">
          <div className="section-header">
            <h2 className="section-title">时光</h2>
          </div>
          <div className="timeline-list">
            {/* 时光项1: 1950 出生 */}
            <div className="timeline-row">
              <span className="tl-year">1950</span>
              <div className="tl-detail">
                <span className="tl-event">出生</span>
                <span className="tl-desc">3月20日生于江苏省南京市</span>
              </div>
            </div>
            {/* 时光项2: 1975 结婚 */}
            <div className="timeline-row">
              <span className="tl-year">1975</span>
              <div className="tl-detail">
                <span className="tl-event">结婚</span>
                <span className="tl-desc">6月24日开始美满的家庭生活</span>
              </div>
            </div>
            {/* 时光项3: 2025 永别 */}
            <div className="timeline-row">
              <span className="tl-year">2025</span>
              <div className="tl-detail">
                <span className="tl-event">永别</span>
                <span className="tl-desc">12月20日安详离世，享年75岁</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 留言区块 ===== */}
        <div className="section section-comments">
          <div className="section-header">
            <h2 className="section-title">留言</h2>
            <span className="section-more">20条</span>
          </div>

          {/* 留言1: 李明 */}
          <div className="comment-item">
            <div className="comment-avatar-wrap">
              <div className="comment-avatar-border">
                <img className="comment-avatar" src="/comment-avatar1.webp" alt=""
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('avatar-placeholder') }} />
              </div>
            </div>
            <div className="comment-body">
              <div className="comment-name-row">
                <span className="comment-name">李明</span>
                <div className="comment-tag">
                  <span>亲友</span>
                </div>
              </div>
              <p className="comment-text">爸爸，我们永远怀念你。</p>
              <span className="comment-time">上午 10:43</span>
            </div>
            <div className="comment-bloom">
              <BloomSmall />
              <span>x12</span>
            </div>
          </div>
          <div className="comment-divider" />

          {/* 留言2: 李宝儿 */}
          <div className="comment-item">
            <div className="comment-avatar-wrap">
              <div className="comment-avatar-border">
                <img className="comment-avatar" src="/comment-avatar2.webp" alt=""
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('avatar-placeholder') }} />
              </div>
            </div>
            <div className="comment-body">
              <div className="comment-name-row">
                <span className="comment-name">李宝儿</span>
                <div className="comment-tag">
                  <span>亲友</span>
                </div>
              </div>
              <p className="comment-text">还记得总是在厨房看到你满头大汗做饭的样子。</p>
              <span className="comment-time">昨天 14:02</span>
            </div>
            <div className="comment-bloom">
              <BloomSmall />
              <span>x10</span>
            </div>
          </div>
          <div className="comment-divider" />

          {/* 留言3: Merry */}
          <div className="comment-item">
            <div className="comment-avatar-wrap">
              <div className="comment-avatar-border">
                <img className="comment-avatar" src="/comment-avatar3.webp" alt=""
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('avatar-placeholder') }} />
              </div>
            </div>
            <div className="comment-body">
              <div className="comment-name-row">
                <span className="comment-name">Merry</span>
                <div className="comment-tag">
                  <span>亲友</span>
                </div>
              </div>
              <p className="comment-text">那些年一起走过的路，永远不会忘记。</p>
              <span className="comment-time">3天前</span>
            </div>
            <div className="comment-bloom">
              <BloomSmall />
              <span>x8</span>
            </div>
          </div>
          <div className="comment-divider" />

          {/* 留言4: 李明 */}
          <div className="comment-item">
            <div className="comment-avatar-wrap">
              <div className="comment-avatar-border">
                <img className="comment-avatar" src="/comment-avatar1.webp" alt=""
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('avatar-placeholder') }} />
              </div>
            </div>
            <div className="comment-body">
              <div className="comment-name-row">
                <span className="comment-name">李明</span>
                <div className="comment-tag">
                  <span>亲友</span>
                </div>
              </div>
              <p className="comment-text">家人会一直记得您的笑容和温暖。</p>
              <span className="comment-time">上周</span>
            </div>
            <div className="comment-bloom">
              <BloomSmall />
              <span>x15</span>
            </div>
          </div>
          <div className="comment-divider" />
        </div>
      </div>

      {/* ===== 底部固定栏（输入框 + 送花按钮） ===== */}
      <div className="profile-bottom-bar">
        <div className="flower-input-bar">
          <div className="input-edit-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 21H21.5" stroke="#DFDFDF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.5 13.36V17H9.1586L19.5 6.65405L15.8476 3L5.5 13.36Z" fill="#DFDFDF" stroke="#DFDFDF" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <span className="input-placeholder-text">我想对TA说</span>
        </div>
        <div className="flower-btn" onClick={openBloomModal}>
          <BloomIcon size={29} />
        </div>
      </div>

      {/* 送花浮层遮罩 */}
      {showBloomModal && (
        <div className={`bloom-overlay ${bloomVisible ? 'bloom-overlay-visible' : ''}`} onClick={closeBloomModal}>
          {/* 送花浮层 */}
          <div className={`bloom-modal ${bloomVisible ? 'bloom-modal-visible' : ''}`} onClick={(e) => e.stopPropagation()}>
            {/* 上半部分 — 白色卡片 + 花朵选择 */}
            <div className="bloom-card">
              {/* 第一行：小红花、白菊、白玫瑰、康乃馨 */}
              <div className="bloom-row">
                {[
                  { img: '/bloom-redflower.webp', name: '小红花', meaning: '想念' },
                  { img: '/bloom-whitedaisy.webp', name: '白菊', meaning: '追思' },
                  { img: '/bloom-whiterose.webp', name: '白玫瑰', meaning: '怀念' },
                  { img: '/bloom-carnation.webp', name: '康乃馨', meaning: '思念' },
                ].map((flower) => (
                  <div className={`bloom-item ${selectedFlower === flower.name ? 'bloom-item-selected' : ''}`} key={flower.name} onClick={() => setSelectedFlower(flower.name)}>
                    <div className="bloom-item-bg">
                      <img className="bloom-item-img" src={flower.img} alt="" onError={(e) => { e.target.style.display = 'none' }} />
                    </div>
                    <span className="bloom-item-name">{flower.name}</span>
                    <span className="bloom-item-meaning">{flower.meaning}</span>
                  </div>
                ))}
              </div>
              {/* 第二行：马蹄莲、雏菊、勿忘我、向日葵 */}
              <div className="bloom-row">
                {[
                  { img: '/bloom-lily.webp', name: '马蹄莲', meaning: '缅怀' },
                  { img: '/bloom-daisy.webp', name: '雏菊', meaning: '平安' },
                  { img: '/bloom-forgetmenot.webp', name: '勿忘我', meaning: '记得' },
                  { img: '/bloom-sunflower.webp', name: '向日葵', meaning: '阳光' },
                ].map((flower) => (
                  <div className={`bloom-item ${selectedFlower === flower.name ? 'bloom-item-selected' : ''}`} key={flower.name} onClick={() => setSelectedFlower(flower.name)}>
                    <div className="bloom-item-bg">
                      <img className="bloom-item-img" src={flower.img} alt="" onError={(e) => { e.target.style.display = 'none' }} />
                    </div>
                    <span className="bloom-item-name">{flower.name}</span>
                    <span className="bloom-item-meaning">{flower.meaning}</span>
                  </div>
                ))}
              </div>
              {/* 赠送按钮 */}
              <div className="bloom-send-row">
                <div className={`bloom-send-btn ${selectedFlower ? '' : 'bloom-send-btn-disabled'}`} onClick={() => { if (selectedFlower) sendBloom() }}>
                  <span>赠送</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== 赠送成功动画 — 大红花 + 花瓣飘散 ===== */}
      {showBloomGift && (
        <div className="bloom-gift-overlay">
          <div className={`bloom-gift-flower ${giftPhase === 'appear' ? 'bloom-gift-flower-visible' : ''} ${giftPhase === 'sway' ? 'bloom-gift-flower-visible bloom-gift-flower-sway' : ''} ${giftPhase === 'exit' ? 'bloom-gift-flower-visible bloom-gift-flower-exit' : ''}`}>
            <img src="/bloom-redflower-large.webp" alt="" />
          </div>
          {/* 沙化粒子 — S型飘散向鲜花56 */}
          <div className={`bloom-petal bloom-petal-1 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-2 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-3 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-4 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-5 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-6 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-7 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-8 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-9 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-10 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-11 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-12 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-13 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-14 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-15 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-16 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-17 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-18 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-19 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
          <div className={`bloom-petal bloom-petal-20 ${giftPhase === 'exit' ? 'bloom-petal-active' : ''}`} />
        </div>
      )}

    </div>
  )
}

export default ProfilePage
