import React, { useState, useRef } from 'react';

const navItems = [
  { key: 'subscribe', icon: '📚', label: '订阅' },
  { key: 'search', icon: '🔍', label: '搜索' },
];

function PodcastList({ data }) {
  if (!data || !Array.isArray(data.results) || data.results.length === 0) {
    return <div className="text-4xl font-bold text-cyan-400 mt-12 text-center">没有数据</div>;
  }
  return (
    <div className="overflow-y-auto max-h-[32rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {data.results.map(item => (
        <div key={item.collectionId} className="flex items-center bg-gray-900 rounded-xl p-4 shadow hover:shadow-lg transition-all">
          <img src={item.artworkUrl100} alt={item.collectionName} className="w-20 h-20 rounded-lg object-cover mr-6" />
          <div className="flex-1 min-w-0">
            <a href={item.collectionViewUrl} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-cyan-300 hover:underline truncate block">{item.collectionName}</a>
            <div className="text-gray-400 text-sm truncate">{item.artistName}</div>
            <div className="text-gray-500 text-xs mt-1 truncate">{item.primaryGenreName} | {item.country}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SearchPanel() {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const debounceRef = useRef();

  const doSearch = async (keyword) => {
    if (!keyword.trim()) {
      setResult(null);
      setError(null);
      return;
    }
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`https://itunes.apple.com/search?media=podcast&entity=podcast&term=${encodeURIComponent(keyword)}`);
      if (!res.ok) throw new Error('网络错误');
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e.message || '未知错误');
    }
  };

  // 输入时自动搜索（防抖）
  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doSearch(v);
    }, 500);
  }

  return (
    <div className="flex flex-col items-center w-full mt-16">
      <div className="flex w-full max-w-5xl mb-12 px-4 mx-auto">
        <input
          className="flex-1 bg-gray-800 rounded-xl px-6 py-4 text-lg text-white border-none outline-none placeholder-gray-400 shadow focus:ring-2 focus:ring-cyan-400"
          placeholder="搜索播客"
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className="w-full max-w-5xl min-h-[8rem] px-4 mx-auto">
        {error && <div className="text-red-400 text-lg">{error}</div>}
        {!error && result && <PodcastList data={result} />}
        {!error && !result && (
          <div className="text-4xl font-bold text-cyan-400 mt-12 text-center">没有数据</div>
        )}
      </div>
    </div>
  );
}

const navContent = {
  subscribe: <div className="text-4xl font-bold text-blue-400 mt-32">订阅内容</div>,
  search: <SearchPanel />,
};

export default function Podcast() {
  const [activeKey, setActiveKey] = useState('search');

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white">
      {/* 左侧导航栏 */}
      <aside className="w-56 bg-black flex flex-col py-8 border-r border-gray-800">
        <div className="flex items-center text-2xl font-extrabold mb-12 ml-8">
          <span role="img" aria-label="podcast">🎙️</span>
          <span className="ml-3 tracking-wide">Podcasts</span>
        </div>
        <nav className="flex-1 w-full">
          {navItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center px-8 py-4 text-lg cursor-pointer transition-all rounded-l-full mb-2 select-none
                ${activeKey === item.key
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-700 text-white shadow-lg'
                  : 'hover:bg-gray-800 hover:text-cyan-300 text-gray-300'}`}
              onClick={() => setActiveKey(item.key)}
            >
              <span className="text-2xl mr-4">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
      </aside>
      {/* 右侧内容区 */}
      <main className="flex-1 flex flex-col items-center justify-start bg-[#181818] relative">
        {navContent[activeKey]}
      </main>
    </div>
  );
}
