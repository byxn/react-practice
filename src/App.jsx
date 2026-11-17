import { useState } from 'react';

import FunctionComponent from './FunctionComponent.jsx'

function App() {
  const [currentExample, setCurrentExample] = useState('menu');

  const examples = [
    {id: 'component',name:'函数组件',component:<FunctionComponent />}
  ];

  const renderContent = () => {
    if (currentExample === 'menu') {
      return (
        <div>
          <h1>React 练习例子</h1>
          <div>
            {examples.map(example => (
              <button
                key={example.id}
                onClick={() => setCurrentExample(example.id)}
              >
                {example.name}
              </button>
            ))}
          </div>
        </div>
      );
    }

    const selectedExample = examples.find(ex => ex.id === currentExample);
    if (selectedExample) {
      return (
        <div>
          <div>
            <button 
              onClick={() => setCurrentExample('menu')}
            >
              ← 返回菜单
            </button>
            <h2>{selectedExample.name}</h2>
          </div>
          <div>
            {selectedExample.component}
          </div>
        </div>
      );
    }

    return <div>例子未找到</div>;
  };

  return (
    <div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;

