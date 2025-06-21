import React, { useState } from 'react';
import { 
  Calendar, 
  Star, 
  Phone, 
  Video, 
  Paperclip, 
  Image, 
  MessageSquare, 
  Send, 
  FileText, 
  MessageCircle,
  Check,
  CheckCircle
} from 'lucide-react';
import styles from './StudentMessages.module.css';

const mockConversations = [
  {
    id: 1,
    tutor: 'Dr. Sarah Johnson',
    subject: 'Mathematics',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'I have several slots available this week. When would you prefer?',
    lastMessageTime: '2:30 PM',
    unreadCount: 0,
    isOnline: true,
    isImportant: false,
    status: 'active',
    rating: 4.9
  },
  {
    id: 2,
    tutor: 'Prof. Michael Chen',
    subject: 'Statistics',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'Great! Let\'s work on probability distributions tomorrow.',
    lastMessageTime: '1:45 PM',
    unreadCount: 1,
    isOnline: false,
    isImportant: true,
    status: 'active',
    rating: 4.8
  },
  {
    id: 3,
    tutor: 'Dr. Emily Rodriguez',
    subject: 'Calculus',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'The session was very helpful. Thank you!',
    lastMessageTime: '11:20 AM',
    unreadCount: 0,
    isOnline: true,
    isImportant: false,
    status: 'completed',
    rating: 4.7
  },
  {
    id: 4,
    tutor: 'Prof. David Brown',
    subject: 'Geometry',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'I\'ve uploaded the practice problems.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    isImportant: false,
    status: 'active',
    rating: 4.6
  },
  {
    id: 5,
    tutor: 'Dr. Lisa Garcia',
    subject: 'Algebra',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    lastMessage: 'When is our next session?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    isImportant: false,
    status: 'active',
    rating: 4.5
  }
];

const mockMessages = {
  1: [
    {
      id: 1,
      sender: 'student',
      message: 'Hi Dr. Johnson! I hope you\'re doing well.',
      timestamp: '2:00 PM',
      isRead: true,
      attachments: []
    },
    {
      id: 2,
      sender: 'tutor',
      message: 'Hello! I\'m doing great, thank you. How can I help you today?',
      timestamp: '2:05 PM',
      isRead: true,
      attachments: []
    },
    {
      id: 3,
      sender: 'student',
      message: 'I\'m having trouble with calculus integration techniques. Do you have any availability this week?',
      timestamp: '2:15 PM',
      isRead: true,
      attachments: []
    },
    {
      id: 4,
      sender: 'tutor',
      message: 'Of course! I have several slots available. Let me check my schedule and send you some options.',
      timestamp: '2:20 PM',
      isRead: true,
      attachments: []
    },
    {
      id: 5,
      sender: 'tutor',
      message: 'I have several slots available this week. When would you prefer?',
      timestamp: '2:30 PM',
      isRead: false,
      attachments: []
    }
  ],
  2: [
    {
      id: 1,
      sender: 'student',
      message: 'Hi Prof. Chen, I\'m struggling with probability distributions.',
      timestamp: '1:30 PM',
      isRead: true,
      attachments: []
    },
    {
      id: 2,
      sender: 'tutor',
      message: 'Hello! Probability distributions can be tricky. Which specific concepts are you finding challenging?',
      timestamp: '1:35 PM',
      isRead: true,
      attachments: []
    },
    {
      id: 3,
      sender: 'tutor',
      message: 'Great! Let\'s work on probability distributions tomorrow.',
      timestamp: '1:45 PM',
      isRead: false,
      attachments: []
    }
  ],
  3: [
    {
      id: 1,
      sender: 'student',
      message: 'Thank you so much for the session today!',
      timestamp: '11:00 AM',
      isRead: true,
      attachments: []
    },
    {
      id: 2,
      sender: 'tutor',
      message: 'You\'re very welcome! I\'m glad I could help with the differential equations.',
      timestamp: '11:10 AM',
      isRead: true,
      attachments: []
    },
    {
      id: 3,
      sender: 'tutor',
      message: 'The session was very helpful. Thank you!',
      timestamp: '11:20 AM',
      isRead: true,
      attachments: []
    }
  ]
};

const quickTemplates = [
  "I'd like to schedule a session for this week.",
  "Can you help me with my homework?",
  "I'm available tomorrow at 3 PM.",
  "Thank you for the session!",
  "I have a question about the material."
];

const StudentMessages = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [conversationSearch, setConversationSearch] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Messaging functions
  const filteredConversations = conversations.filter(conversation =>
    conversation.tutor.toLowerCase().includes(conversationSearch.toLowerCase()) ||
    conversation.subject.toLowerCase().includes(conversationSearch.toLowerCase())
  );

  const sortedConversations = [...filteredConversations].sort((a, b) => {
    // Important conversations first
    if (a.isImportant && !b.isImportant) return -1;
    if (!a.isImportant && b.isImportant) return 1;
    
    // Then by unread count
    if (a.unreadCount > b.unreadCount) return -1;
    if (a.unreadCount < b.unreadCount) return 1;
    
    // Then by last message time (most recent first)
    return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
  });

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // Mark messages as read
    if (conversation.unreadCount > 0) {
      setConversations(prev => prev.map(conv =>
        conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv
      ));
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now(),
      sender: 'student',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      isRead: false,
      attachments: []
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), message]
    }));

    // Update conversation last message
    setConversations(prev => prev.map(conv =>
      conv.id === selectedConversation.id
        ? {
            ...conv,
            lastMessage: newMessage,
            lastMessageTime: message.timestamp,
            unreadCount: 0
          }
        : conv
    ));

    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTemplateSelect = (template) => {
    setNewMessage(template);
    setShowTemplates(false);
  };

  const handleBookSession = () => {
    // In a real app, this would navigate to booking
    console.log('Book session with:', selectedConversation?.tutor);
  };

  const toggleImportant = (conversationId) => {
    setConversations(prev => prev.map(conv =>
      conv.id === conversationId ? { ...conv, isImportant: !conv.isImportant } : conv
    ));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, upload file and get URL
      console.log('File uploaded:', file.name);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={styles.ratingStar}
        fill={i < Math.floor(rating) ? '#fbbf24' : 'none'}
        color={i < Math.floor(rating) ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  return (
    <div className={styles.messagesContainer}>
      {/* Conversations Sidebar */}
      <div className={styles.conversationsSidebar}>
        <div className={styles.conversationsHeader}>
          <h2 className={styles.conversationsTitle}>Messages</h2>
          <div className={styles.conversationsSearch}>
            <input
              type="text"
              placeholder="Search conversations..."
              value={conversationSearch}
              onChange={(e) => setConversationSearch(e.target.value)}
              className={styles.conversationSearchInput}
            />
          </div>
        </div>
        
        <div className={styles.conversationsList}>
          {sortedConversations.map(conversation => (
            <div
              key={conversation.id}
              className={`${styles.conversationItem} ${
                selectedConversation?.id === conversation.id ? styles.active : ''
              } ${conversation.isImportant ? styles.important : ''}`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <div className={styles.conversationAvatar}>
                <img src={conversation.image} alt={conversation.tutor} />
                {conversation.isOnline && <div className={styles.onlineIndicator}></div>}
              </div>
              
              <div className={styles.conversationContent}>
                <div className={styles.conversationHeader}>
                  <h3 className={styles.conversationName}>
                    {conversation.tutor}
                    {conversation.isImportant && <Star size={14} className={styles.importantIcon} />}
                  </h3>
                  <span className={styles.conversationTime}>{conversation.lastMessageTime}</span>
                </div>
                
                <div className={styles.conversationMeta}>
                  <span className={styles.conversationSubject}>{conversation.subject}</span>
                  <div className={styles.tutorRating}>
                    {renderStars(conversation.rating)}
                    <span className={styles.ratingText}>{conversation.rating}</span>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <span className={styles.unreadBadge}>{conversation.unreadCount}</span>
                  )}
                </div>
                
                <p className={`${styles.conversationPreview} ${conversation.unreadCount > 0 ? styles.unread : ''}`}>
                  {conversation.lastMessage}
                </p>
              </div>
              
              <div className={styles.conversationActions}>
                <button
                  className={styles.conversationActionBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleImportant(conversation.id);
                  }}
                >
                  <Star 
                    size={16} 
                    className={conversation.isImportant ? styles.starred : ''}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={styles.chatWindow}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderInfo}>
                <img src={selectedConversation.image} alt={selectedConversation.tutor} className={styles.chatAvatar} />
                <div className={styles.chatHeaderMeta}>
                  <h3 className={styles.chatTutorName}>
                    {selectedConversation.tutor}
                    {selectedConversation.isOnline && <div className={styles.chatOnlineIndicator}></div>}
                  </h3>
                  <p className={styles.chatSubject}>{selectedConversation.subject}</p>
                  <div className={styles.chatRating}>
                    {renderStars(selectedConversation.rating)}
                    <span className={styles.ratingText}>{selectedConversation.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.chatHeaderActions}>
                <button 
                  className={styles.chatActionBtn}
                  onClick={handleBookSession}
                >
                  <Calendar size={16} />
                  Book Session
                </button>
                <button className={styles.chatActionBtn}>
                  <Phone size={16} />
                  Call
                </button>
                <button className={styles.chatActionBtn}>
                  <Video size={16} />
                  Video
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className={styles.chatMessages}>
              {messages[selectedConversation.id]?.map(message => (
                <div
                  key={message.id}
                  className={`${styles.messageItem} ${
                    message.sender === 'student' ? styles.messageOutgoing : styles.messageIncoming
                  }`}
                >
                  <div className={styles.messageBubble}>
                    <p className={styles.messageText}>{message.message}</p>
                    <div className={styles.messageMeta}>
                      <span className={styles.messageTime}>{message.timestamp}</span>
                      {message.sender === 'student' && (
                        <span className={styles.messageStatus}>
                          {message.isRead ? <CheckCircle size={12} /> : <Check size={12} />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className={`${styles.messageItem} ${styles.messageIncoming}`}>
                  <div className={styles.typingIndicator}>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className={styles.chatInput}>
              <div className={styles.chatInputActions}>
                <button 
                  className={styles.chatInputBtn}
                  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                >
                  <Paperclip size={20} />
                </button>
                
                {showAttachmentMenu && (
                  <div className={styles.attachmentMenu}>
                    <label className={styles.attachmentOption}>
                      <FileText size={16} />
                      Document
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <label className={styles.attachmentOption}>
                      <Image size={16} />
                      Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                )}
                
                <button 
                  className={styles.chatInputBtn}
                  onClick={() => setShowTemplates(!showTemplates)}
                >
                  <MessageSquare size={20} />
                </button>
                
                {showTemplates && (
                  <div className={styles.templatesMenu}>
                    {quickTemplates.map((template, index) => (
                      <button
                        key={index}
                        className={styles.templateOption}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        {template}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className={styles.chatInputField}>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={styles.messageTextarea}
                  rows={1}
                />
                <button 
                  className={styles.sendButton}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.noChatSelected}>
            <div className={styles.noChatIcon}>
              <MessageCircle size={64} />
            </div>
            <h3 className={styles.noChatTitle}>Select a conversation</h3>
            <p className={styles.noChatText}>
              Choose a conversation from the list to start messaging.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMessages; 