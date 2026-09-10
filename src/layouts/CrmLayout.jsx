import { Outlet } from 'react-router-dom'
import Sidebar from '../components/crm/Sidebar'
import Topbar from '../components/crm/Topbar'
import ChatbotWidget from '../components/public/Chatbot'

export default function CrmLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="sidebar-overlay" id="sidebarOverlay"></div>
      <div className="flex-1 ml-[255px] bg-surface-alt flex flex-col h-screen overflow-hidden">
        <Topbar />
        <div className="p-6 lg:p-7 overflow-y-auto flex-1 animate-fade-in-up">
          <Outlet />
        </div>
      </div>
      <ChatbotWidget portal="crm" />
    </div>
  )
}
