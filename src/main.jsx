import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ExerciseIcon from './ExerciseIcon.jsx';
import { getDefaultDayKey, getPlanByDayKey, weekPlans } from './plan.js';
import './styles.css';

const tokenKey = 'fitness-tracker-token';
const todayKey = () => new Date().toISOString().slice(0, 10);

function emptySet(exercise) {
  if (exercise.type === 'cardio') {
    return { minutes: '', distanceKm: '', done: false, note: '' };
  }
  return { weightKg: '', reps: '', done: false, note: '' };
}

function makeExerciseRecord(exercise) {
  const defaultSets = exercise.type === 'cardio' ? 1 : Number((exercise.target.match(/^(\d+)/) || [])[1] || 3);
  return {
    exerciseId: exercise.id,
    type: exercise.type,
    sets: Array.from({ length: defaultSets }, () => emptySet(exercise))
  };
}

function makeRecord(plan, date) {
  return {
    date,
    dayKey: plan.dayKey,
    completedAt: '',
    exercises: plan.exercises.map(makeExerciseRecord),
    overallFeeling: '正常',
    notes: ''
  };
}

async function api(path, options = {}) {
  const token = localStorage.getItem(tokenKey);
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(path, { ...options, headers });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `请求失败：${response.status}`);
  }
  return response.json();
}

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api('/api/login', {
        method: 'POST',
        body: JSON.stringify({ password })
      });
      localStorage.setItem(tokenKey, data.token);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-card">
        <div className="brand-mark">练</div>
        <h1>健身记录</h1>
        <p>输入密码查看训练计划和保存记录。</p>
        <form onSubmit={submit}>
          <input type="password" placeholder="访问密码" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus />
          <button type="submit" disabled={loading || !password}>{loading ? '登录中…' : '进入'}</button>
        </form>
        {error && <div className="error">{error}</div>}
      </section>
    </main>
  );
}

function DayTabs({ selected, onSelect }) {
  return (
    <div className="tabs" role="tablist">
      {weekPlans.map((plan) => (
        <button key={plan.dayKey} className={selected === plan.dayKey ? 'active' : ''} onClick={() => onSelect(plan.dayKey)}>
          <span>{plan.label}</span>
          <small>{plan.title.split(' + ')[0]}</small>
        </button>
      ))}
    </div>
  );
}

function ExerciseCard({ exercise, record, onChange }) {
  const sets = record?.sets || [emptySet(exercise)];

  function updateSet(index, patch) {
    const nextSets = sets.map((set, setIndex) => (setIndex === index ? { ...set, ...patch } : set));
    onChange({ ...record, sets: nextSets });
  }

  function addSet() {
    onChange({ ...record, sets: [...sets, emptySet(exercise)] });
  }

  function removeSet(index) {
    if (sets.length <= 1) return;
    onChange({ ...record, sets: sets.filter((_, setIndex) => setIndex !== index) });
  }

  const doneCount = sets.filter((set) => set.done).length;

  return (
    <article className="exercise-card">
      <div className="exercise-head">
        <ExerciseIcon type={exercise.icon} />
        <div>
          <div className="pill">{exercise.muscle}</div>
          <h3>{exercise.name}</h3>
          <p>{exercise.target} · {exercise.cue}</p>
        </div>
      </div>
      <div className="set-list">
        {sets.map((set, index) => (
          <div className="set-row" key={index}>
            <label className="done-check">
              <input type="checkbox" checked={Boolean(set.done)} onChange={(event) => updateSet(index, { done: event.target.checked })} />
              <span>{index + 1}</span>
            </label>
            {exercise.type === 'cardio' ? (
              <>
                <input inputMode="decimal" placeholder={exercise.unit || '分钟'} value={set.minutes} onChange={(event) => updateSet(index, { minutes: event.target.value })} />
                <input inputMode="decimal" placeholder="公里" value={set.distanceKm} onChange={(event) => updateSet(index, { distanceKm: event.target.value })} />
              </>
            ) : (
              <>
                <input inputMode="decimal" placeholder="kg" value={set.weightKg} onChange={(event) => updateSet(index, { weightKg: event.target.value })} />
                <input inputMode="numeric" placeholder="次数" value={set.reps} onChange={(event) => updateSet(index, { reps: event.target.value })} />
              </>
            )}
            <input className="note-input" placeholder="备注" value={set.note} onChange={(event) => updateSet(index, { note: event.target.value })} />
            <button className="ghost small" type="button" onClick={() => removeSet(index)} disabled={sets.length <= 1}>删</button>
          </div>
        ))}
      </div>
      <div className="card-actions">
        <button className="ghost" type="button" onClick={addSet}>+ 加一组</button>
        <span>{doneCount}/{sets.length} 已完成</span>
      </div>
    </article>
  );
}

function History({ records, onPick }) {
  const entries = Object.values(records).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 12);
  return (
    <section className="panel history-panel">
      <div className="section-title">
        <h2>历史记录</h2>
        <span>{entries.length} 条</span>
      </div>
      {entries.length === 0 ? <p className="muted">还没有记录，完成一次训练后会显示在这里。</p> : (
        <div className="history-list">
          {entries.map((record) => {
            const plan = getPlanByDayKey(record.dayKey);
            const total = record.exercises?.reduce((sum, item) => sum + (item.sets?.length || 0), 0) || 0;
            const done = record.exercises?.reduce((sum, item) => sum + (item.sets?.filter((set) => set.done).length || 0), 0) || 0;
            return (
              <button key={record.date} onClick={() => onPick(record.date, record.dayKey)}>
                <strong>{record.date}</strong>
                <span>{plan.label} · {done}/{total} 组 · {record.overallFeeling || '未填写体感'}</span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem(tokenKey)));
  const [records, setRecords] = useState({});
  const [date, setDate] = useState(todayKey());
  const [dayKey, setDayKey] = useState(getDefaultDayKey());
  const [record, setRecord] = useState(null);
  const [status, setStatus] = useState('');
  const [view, setView] = useState('today');

  const plan = useMemo(() => getPlanByDayKey(dayKey), [dayKey]);

  useEffect(() => {
    if (!loggedIn) return;
    api('/api/records')
      .then(setRecords)
      .catch((err) => {
        if (err.message.includes('登录')) {
          localStorage.removeItem(tokenKey);
          setLoggedIn(false);
        } else {
          setStatus(err.message);
        }
      });
  }, [loggedIn]);

  useEffect(() => {
    const existing = records[date];
    if (existing) {
      setDayKey(existing.dayKey || dayKey);
      setRecord(existing);
      return;
    }
    setRecord(makeRecord(plan, date));
  }, [date, dayKey, records]);

  function updateExercise(exerciseId, nextExerciseRecord) {
    setRecord((current) => ({
      ...current,
      exercises: current.exercises.map((item) => item.exerciseId === exerciseId ? nextExerciseRecord : item)
    }));
  }

  function changeDay(nextDayKey) {
    setDayKey(nextDayKey);
    const nextPlan = getPlanByDayKey(nextDayKey);
    setRecord(makeRecord(nextPlan, date));
  }

  async function save() {
    setStatus('保存中…');
    const payload = {
      ...record,
      dayKey,
      completedAt: new Date().toISOString()
    };
    try {
      const saved = await api(`/api/records/${date}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      setRecords((current) => ({ ...current, [date]: saved }));
      setRecord(saved);
      setStatus('已保存');
      setTimeout(() => setStatus(''), 1800);
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function exportRecords() {
    setStatus('导出中…');
    try {
      const token = localStorage.getItem(tokenKey);
      const response = await fetch('/api/export', { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error('导出失败');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fitness-records-${todayKey()}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setStatus('已导出');
      setTimeout(() => setStatus(''), 1800);
    } catch (err) {
      setStatus(err.message);
    }
  }

  function logout() {
    localStorage.removeItem(tokenKey);
    setLoggedIn(false);
  }

  function pickHistory(nextDate, nextDayKey) {
    setDate(nextDate);
    setDayKey(nextDayKey);
    setView('today');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;
  if (!record) return null;

  const done = record.exercises.reduce((sum, item) => sum + item.sets.filter((set) => set.done).length, 0);
  const total = record.exercises.reduce((sum, item) => sum + item.sets.length, 0);
  const progress = total ? Math.round((done / total) * 100) : 0;

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="hero-top">
          <div>
            <p>178cm / 70kg · 塑形增肌</p>
            <h1>今天练什么？</h1>
          </div>
          <button className="ghost logout" onClick={logout}>退出</button>
        </div>
        <div className="progress-card">
          <div>
            <strong>{progress}%</strong>
            <span>{done}/{total} 组完成</span>
          </div>
          <div className="progress-bar"><i style={{ width: `${progress}%` }} /></div>
        </div>
      </header>

      <nav className="bottom-nav top-nav">
        <button className={view === 'today' ? 'active' : ''} onClick={() => setView('today')}>训练</button>
        <button className={view === 'history' ? 'active' : ''} onClick={() => setView('history')}>历史</button>
        <button type="button" onClick={exportRecords}>导出</button>
      </nav>

      {view === 'today' ? (
        <>
          <section className="panel controls-panel">
            <label>训练日期<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
            <DayTabs selected={dayKey} onSelect={changeDay} />
          </section>

          <section className="plan-summary">
            <div>
              <span>{plan.label}</span>
              <h2>{plan.title}</h2>
              <p>{plan.goal}</p>
            </div>
          </section>

          <section className="exercise-list">
            {plan.exercises.map((exercise) => {
              const exerciseRecord = record.exercises.find((item) => item.exerciseId === exercise.id) || makeExerciseRecord(exercise);
              return <ExerciseCard key={exercise.id} exercise={exercise} record={exerciseRecord} onChange={(next) => updateExercise(exercise.id, next)} />;
            })}
          </section>

          <section className="panel notes-panel">
            <label>整体体感
              <select value={record.overallFeeling || '正常'} onChange={(event) => setRecord({ ...record, overallFeeling: event.target.value })}>
                <option>轻松</option>
                <option>正常</option>
                <option>有挑战</option>
                <option>太累</option>
                <option>不舒服</option>
              </select>
            </label>
            <label>今日备注
              <textarea rows="3" placeholder="比如：肩有点酸、下次推胸加重量…" value={record.notes || ''} onChange={(event) => setRecord({ ...record, notes: event.target.value })} />
            </label>
          </section>

          <div className="save-bar">
            <span>{status}</span>
            <button onClick={save}>保存今天记录</button>
          </div>
        </>
      ) : (
        <History records={records} onPick={pickHistory} />
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
