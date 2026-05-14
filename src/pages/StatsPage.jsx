import React from 'react'
import { useLearning, getCurrentBank, getStats } from '../context/LearningContext'
import './StatsPage.css'

function StatsPage() {
  const { state } = useLearning()
  const currentBank = getCurrentBank(state)
  const stats = getStats(state)
  const questions = currentBank?.questions || []

  const statusCounts = {
    mastered: questions.filter(q => state.progress[q.id]?.status === 'mastered').length,
    fuzzy: questions.filter(q => state.progress[q.id]?.status === 'fuzzy').length,
    unknown: questions.filter(q => state.progress[q.id]?.status === 'unknown').length,
    unreviewed: questions.filter(q => !state.progress[q.id]).length
  }

  const circleStats = [
    { label: '掌握', value: statusCounts.mastered, color: 'var(--accent-success)', icon: '✓' },
    { label: '模糊', value: statusCounts.fuzzy, color: 'var(--accent-warning)', icon: '~' },
    { label: '不会', value: statusCounts.unknown, color: 'var(--accent-error)', icon: '✕' },
    { label: '未学', value: statusCounts.unreviewed, color: 'var(--text-secondary)', icon: '○' }
  ]

  if (!currentBank) {
    return (
      <div className="stats-page">
        <header className="stats-header">
          <h1 className="stats-title">学习统计</h1>
        </header>
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h2 className="empty-title">暂无题库</h2>
          <p className="empty-text">请先添加或导入题库</p>
        </div>
      </div>
    )
  }

  return (
    <div className="stats-page">
      <header className="stats-header">
        <h1 className="stats-title">学习统计</h1>
        <p className="stats-subtitle">{currentBank.name}</p>
      </header>

      <div className="stats-content">
        <section className="overview-section">
          <div className="overview-card">
            <div className="overview-main">
              <div className="mastery-circle">
                <svg viewBox="0 0 100 100" className="circle-svg">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="var(--border-subtle)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="var(--accent-success)"
                    strokeWidth="8"
                    strokeDasharray={`${stats.masteryRate * 2.83} 283`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    className="circle-progress"
                  />
                </svg>
                <div className="circle-content">
                  <span className="circle-value">{stats.masteryRate}%</span>
                  <span className="circle-label">掌握率</span>
                </div>
              </div>

              <div className="overview-stats">
                <div className="overview-item">
                  <span className="overview-icon">📖</span>
                  <div className="overview-info">
                    <span className="overview-number">{stats.reviewed}</span>
                    <span className="overview-text">已学习</span>
                  </div>
                </div>
                <div className="overview-item">
                  <span className="overview-icon">📚</span>
                  <div className="overview-info">
                    <span className="overview-number">{stats.todayReviewed}</span>
                    <span className="overview-text">今日学习</span>
                  </div>
                </div>
                <div className="overview-item">
                  <span className="overview-icon">📝</span>
                  <div className="overview-info">
                    <span className="overview-number">{stats.total}</span>
                    <span className="overview-text">总题数</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="breakdown-section">
          <h2 className="section-title">题目状态分布</h2>
          <div className="breakdown-grid">
            {circleStats.map((item, index) => (
              <div key={index} className="breakdown-item">
                <div className="breakdown-icon" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <div className="breakdown-info">
                  <span className="breakdown-value">{item.value}</span>
                  <span className="breakdown-label">{item.label}</span>
                </div>
                <div className="breakdown-bar">
                  <div
                    className="breakdown-fill"
                    style={{
                      width: `${stats.total > 0 ? (item.value / stats.total) * 100 : 0}%`,
                      background: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <h2 className="section-title">题型分布</h2>
          <div className="detail-list">
            <div className="detail-item">
              <div className="detail-header">
                <span className="detail-type-badge type-single">单选</span>
              </div>
              <div className="detail-progress">
                <div
                  className="detail-fill mastered"
                  style={{
                    width: `${questions.filter(q => q.type === 'single' && state.progress[q.id]?.status === 'mastered').length / Math.max(questions.filter(q => q.type === 'single').length, 1) * 100}%`
                  }}
                />
                <div
                  className="detail-fill fuzzy"
                  style={{
                    width: `${questions.filter(q => q.type === 'single' && state.progress[q.id]?.status === 'fuzzy').length / Math.max(questions.filter(q => q.type === 'single').length, 1) * 100}%`
                  }}
                />
              </div>
              <span className="detail-count">
                {questions.filter(q => q.type === 'single' && state.progress[q.id]).length} / {questions.filter(q => q.type === 'single').length}
              </span>
            </div>

            <div className="detail-item">
              <div className="detail-header">
                <span className="detail-type-badge type-multiple">多选</span>
              </div>
              <div className="detail-progress">
                <div
                  className="detail-fill mastered"
                  style={{
                    width: `${questions.filter(q => q.type === 'multiple' && state.progress[q.id]?.status === 'mastered').length / Math.max(questions.filter(q => q.type === 'multiple').length, 1) * 100}%`
                  }}
                />
                <div
                  className="detail-fill fuzzy"
                  style={{
                    width: `${questions.filter(q => q.type === 'multiple' && state.progress[q.id]?.status === 'fuzzy').length / Math.max(questions.filter(q => q.type === 'multiple').length, 1) * 100}%`
                  }}
                />
              </div>
              <span className="detail-count">
                {questions.filter(q => q.type === 'multiple' && state.progress[q.id]).length} / {questions.filter(q => q.type === 'multiple').length}
              </span>
            </div>

            <div className="detail-item">
              <div className="detail-header">
                <span className="detail-type-badge type-boolean">判断</span>
              </div>
              <div className="detail-progress">
                <div
                  className="detail-fill mastered"
                  style={{
                    width: `${questions.filter(q => q.type === 'boolean' && state.progress[q.id]?.status === 'mastered').length / Math.max(questions.filter(q => q.type === 'boolean').length, 1) * 100}%`
                  }}
                />
                <div
                  className="detail-fill fuzzy"
                  style={{
                    width: `${questions.filter(q => q.type === 'boolean' && state.progress[q.id]?.status === 'fuzzy').length / Math.max(questions.filter(q => q.type === 'boolean').length, 1) * 100}%`
                  }}
                />
              </div>
              <span className="detail-count">
                {questions.filter(q => q.type === 'boolean' && state.progress[q.id]).length} / {questions.filter(q => q.type === 'boolean').length}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default StatsPage
