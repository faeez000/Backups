import React, { useState } from 'react'
import { Card } from 'antd';
import TagSection from './src/components/TagSection/TagSection.jsx';
import NotificationSection from './src/components/NotificationSection/NotificationSection.jsx';

function NotificationBuilderPage() {
  const [activeTabKey, setActiveTabKey] = useState('Tag');

  
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const tabList = [
    {
      key: 'Tag',
      tab: 'Tag',
    },
    {
      key: 'Notification',
      tab: 'Notification',
    },
  ];
  
  const contentListNoTitle: Record<string, React.ReactNode> = {
    Tag: <TagSection />,
    Notification: <NotificationSection />,
  };

  return (
    <div className ="container mx-auto w-100 h-full ">
      
      <div className="bg-slate-50">
          <div>
            <p className="PageHeading text-center font-semibold text-4xl "> Notification Builder </p>
          </div>

          <div className="TagModalSection flex justify-end mt-2 ">
         
            <Card
              className="bg-slate-50"
              style={{ width: '100%' }}
              tabList={tabList}
              activeTabKey={activeTabKey}
              onTabChange={key => {
                onTabChange(key);
              }}
            >
              {contentListNoTitle[activeTabKey]}
            </Card>
            
          </div>

      </div>
    </div>
  )
}

export default NotificationBuilderPage
