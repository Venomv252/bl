import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Messages.module.css';
import { 
  Search, 
  Send, 
  Paperclip, 
  User, 
  Eye, 
  Calendar,
  FileText,
  Image as ImageIcon,
  Check,
  CheckCheck
} from 'lucide-react';

const mockConversations = [
  {
    id: 1,
    tutor: 'Dr. Sarah Johnson',
    subject: 'Mathematics',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'Great work on the calculus problems!',
    lastTime: '2:30 PM',
    unread: 2,
    online: true
  },
  {
    id: 2,
    tutor: 'Prof. Michael Chen',
    subject: 'Physics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'When are you available this week?',
    lastTime: '11:45 AM',
    unread: 0,
    online: false
  },
  {
    id: 3,
    tutor: 'Ms. Emily Rodriguez',
    subject: 'English Literature',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'I\'ve attached the reading materials for next session.',
    lastTime: 'Yesterday',
    unread: 1,
    online: true
  },
  {
    id: 4,
    tutor: 'Dr. James Wilson',
    subject: 'Chemistry',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'The lab report looks excellent!',
    lastTime: '2 days ago',
    unread: 0,
    online: false
  }
];

const mockMessages = {
  1: [
    {
      id: 1,
      sender: 'tutor',
      message: 'Hi Aryan! How are you doing with the calculus problems?',
      time: '10:30 AM',
      read: true
    },
    {
      id: 2,
      sender: 'student',
      message: 'Hi Dr. Sarah! I\'ve been working on them. I\'m stuck on problem 3.',
      time: '10:32 AM',
      read: true
    },
    {
      id: 3,
      sender: 'tutor',
      message: 'No worries! Let me help you with that. Can you show me what you\'ve tried so far?',
      time: '10:35 AM',
      read: true
    },
    {
      id: 4,
      sender: 'student',
      message: 'Here\'s my work on problem 3',
      time: '2:25 PM',
      read: true,
      attachment: {
        name: 'problem3_work.pdf',
        type: 'pdf'
      }
    },
    {
      id: 5,
      sender: 'tutor',
      message: 'Great work on the calculus problems! Your approach is correct, but you made a small error in the derivative calculation.',
      time: '2:30 PM',
      read: false
    }
  ],
  2: [
    {
      id: 1,
      sender: 'tutor',
      message: 'Hi Aryan! When are you available this week for our physics session?',
      time: '11:45 AM',
      read: true
    }
  ],
  3: [
    {
      id: 1,
      sender: 'tutor',
      message: 'I\'ve attached the reading materials for next session. Please review chapters 5-7 before we meet.',
      time: 'Yesterday',
      read: false,
      attachment: {
        name: 'reading_materials.pdf',
        type: 'pdf'
      }
    }
  ]
};

const quickReplies = [
  "When are you available this week?",
  "Can you explain this concept again?",
  "I need help with my homework",
  "Thank you for the session!",
  "Can we reschedule?"
];

// Mapping of tutor names to their IDs for navigation
const tutorNameToId = {
  'Dr. Sarah Johnson': 1,
  'Prof. Michael Chen': 2,
  'Ms. Emily Rodriguez': 3,
  'Dr. James Wilson': 4,
  'Ms. Lisa Thompson': 5,
  'Prof. David Kim': 6
};

const Messages = () => {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [filteredConversations, setFilteredConversations] = useState(mockConversations);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const filtered = mockConversations.filter(conv =>
      conv.tutor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredConversations(filtered);
  }, [searchQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, you would send this to your backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleQuickReply = (reply) => {
    setNewMessage(reply);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (time) => {
    return time;
  };

  const renderAttachment = (attachment) => {
    const icon = attachment.type === 'pdf' ? <FileText size={16} /> : <ImageIcon size={16} />;
    return (
      <div className={styles.attachment}>
        {icon}
        <span className={styles.attachmentName}>{attachment.name}</span>
      </div>
    );
  };

  const renderReadReceipt = (read) => {
    return (
      <div className={styles.readReceipt}>
        {read ? <CheckCheck size={12} /> : <Check size={12} />}
      </div>
    );
  };

  const handleViewProfile = () => {
    if (selectedConversation) {
      const tutorId = tutorNameToId[selectedConversation.tutor];
      if (tutorId) {
        navigate(`/tutor/${tutorId}`);
      }
    }
  };

  return (
    <div className={styles.messagesRoot}>
      {/* Left Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Messages</h2>
        </div>
        
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search conversations..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className={styles.conversationList}>
          {filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              className={`${styles.conversationItem} ${
                selectedConversation?.id === conversation.id ? styles.active : ''
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <img
                src={conversation.avatar}
                alt={conversation.tutor}
                className={styles.conversationAvatar}
              />
              <div className={styles.conversationContent}>
                <div className={styles.conversationName}>
                  {conversation.tutor}
                  {conversation.online && (
                    <span style={{ 
                      width: 8, 
                      height: 8, 
                      background: '#10b981', 
                      borderRadius: '50%', 
                      display: 'inline-block', 
                      marginLeft: 8 
                    }} />
                  )}
                </div>
                <div className={styles.conversationPreview}>{conversation.lastMessage}</div>
                <div className={styles.conversationTime}>{conversation.lastTime}</div>
              </div>
              {conversation.unread > 0 && (
                <div className={styles.unreadBadge}>{conversation.unread}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className={styles.mainChat}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderLeft}>
                <img
                  src={selectedConversation.avatar}
                  alt={selectedConversation.tutor}
                  className={styles.chatHeaderAvatar}
                />
                <div className={styles.chatHeaderInfo}>
                  <h3>{selectedConversation.tutor}</h3>
                  <p>{selectedConversation.subject}</p>
                </div>
              </div>
              <div className={styles.chatHeaderActions}>
                <button className={styles.chatActionBtn} onClick={handleViewProfile}>
                  <Eye size={16} style={{ marginRight: 4 }} />
                  View Profile
                </button>
                <button className={`${styles.chatActionBtn} ${styles.primary}`}>
                  <Calendar size={16} style={{ marginRight: 4 }} />
                  Book Session
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className={styles.messagesArea}>
              {mockMessages[selectedConversation.id]?.map((message, index) => (
                <div key={message.id} className={styles.messageGroup}>
                  <div className={`${styles.message} ${message.sender === 'student' ? styles.sent : styles.received}`}>
                    {message.message}
                    {message.attachment && renderAttachment(message.attachment)}
                    <div className={styles.messageTime}>{message.time}</div>
                  </div>
                  {message.sender === 'student' && renderReadReceipt(message.read)}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className={styles.quickReplies}>
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className={styles.quickReplyBtn}
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Message Input */}
            <div className={styles.messageInput}>
              <div className={styles.inputContainer}>
                <button className={styles.attachBtn}>
                  <Paperclip size={20} />
                </button>
                <textarea
                  className={styles.messageTextarea}
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows={1}
                />
              </div>
              <button
                className={styles.sendBtn}
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <User className={styles.emptyStateIcon} />
            <h3 className={styles.emptyStateTitle}>Select a conversation</h3>
            <p className={styles.emptyStateText}>
              Choose a tutor from the list to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages; 