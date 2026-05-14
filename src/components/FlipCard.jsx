import React, { useState } from 'react'
import './FlipCard.css'

function FlipCard({ question, isFlipped, onFlip, progress }) {
  const getStatusIndicator = () => {
    if (!progress) return null
    const statusClass = `status-${progress.status}`
    return <span className={`status-dot ${statusClass}`} />
  }

  const renderAnswer = () => {
    if (Array.isArray(question.answer)) {
      return (
        <div className="answer-multiple">
          <span className="answer-label">正确答案：</span>
          <ul className="answer-list">
            {question.answer.map((ans, i) => (
              <li key={i}>{ans}</li>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="answer-single">
        <span className="answer-label">答案：</span>
        <span className="answer-value">{question.answer}</span>
      </div>
    )
  }

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="card-header">
            <span className={`question-type type-${question.type}`}>
              {question.type === 'single' && '单选'}
              {question.type === 'multiple' && '多选'}
              {question.type === 'boolean' && '判断'}
              {question.type === 'short' && '简答'}
            </span>
            {getStatusIndicator()}
          </div>

          <div className="card-content">
            <h2 className="question-text">{question.question}</h2>

            {question.options && (
              <div className="options-list">
                {question.options.map((option, index) => (
                  <div key={index} className="option-item">
                    <span className="option-marker">
                      {question.type === 'multiple' ? '☐' : String.fromCharCode(65 + index) + '.'}
                    </span>
                    <span className="option-text">{option}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card-hint">
            <span className="hint-icon">👆</span>
            <span>点击查看答案</span>
          </div>
        </div>

        <div className="flip-card-back">
          <div className="card-header">
            <span className="answer-header">答案解析</span>
            {getStatusIndicator()}
          </div>

          <div className="card-content">
            {renderAnswer()}

            {question.explanation && (
              <div className="explanation">
                <p className="explanation-label">解析：</p>
                <p className="explanation-text">{question.explanation}</p>
              </div>
            )}
          </div>

          <div className="card-hint">
            <span className="hint-icon">👆</span>
            <span>点击返回题目</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlipCard
