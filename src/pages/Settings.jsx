import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import { 
  User, 
  CreditCard, 
  Bell, 
  Settings as SettingsIcon, 
  Shield, 
  Palette, 
  HelpCircle, 
  Save, 
  Camera, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  Trash2,
  Plus,
  ExternalLink,
  Lock,
  Globe,
  Clock,
  Users,
  X
} from 'lucide-react';

const mockUser = {
  name: 'Aryan Johnson',
  email: 'aryan.johnson@example.com',
  phone: '+1 (555) 123-4567',
  profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  timezone: 'America/New_York',
  language: 'en',
  theme: 'light',
  isPublicProfile: true,
  twoFactorEnabled: false
};

const mockPaymentMethods = [
  {
    id: 1,
    type: 'Visa',
    number: '**** 1234',
    expiry: '12/25',
    isDefault: true
  },
  {
    id: 2,
    type: 'UPI',
    number: 'aryan@upi',
    expiry: null,
    isDefault: false
  }
];

const mockTransactions = [
  {
    id: 1,
    title: 'Enrollment - Dr. Sarah Johnson',
    date: '2024-07-01',
    amount: 150,
    type: 'payment'
  },
  {
    id: 2,
    title: 'Session - Prof. Michael Chen',
    date: '2024-06-28',
    amount: 85,
    type: 'payment'
  },
  {
    id: 3,
    title: 'Refund - Ms. Emily Rodriguez',
    date: '2024-06-25',
    amount: -65,
    type: 'refund'
  }
];

const mockBlockedTutors = [
  {
    id: 1,
    name: 'John Smith',
    subject: 'Mathematics',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
  }
];

const timezones = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Kolkata', label: 'Mumbai (IST)' }
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'hi', label: 'Hindi' },
  { value: 'zh', label: 'Chinese' }
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [userData, setUserData] = useState(mockUser);
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [transactions] = useState(mockTransactions);
  const [blockedTutors, setBlockedTutors] = useState(mockBlockedTutors);
  const [notifications, setNotifications] = useState({
    emailReminders: true,
    emailPromotional: false,
    smsReminders: true,
    inAppBookings: true,
    inAppMessages: true
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrent: false,
    showNew: false,
    showConfirm: false
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleProfileUpdate = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePaymentMethodRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods(prev => prev.filter(method => method.id !== id));
      setMessage({ type: 'success', text: 'Payment method removed successfully' });
    }
  };

  const handleBlockedTutorUnblock = (id) => {
    if (window.confirm('Are you sure you want to unblock this tutor?')) {
      setBlockedTutors(prev => prev.filter(tutor => tutor.id !== id));
      setMessage({ type: 'success', text: 'Tutor unblocked successfully' });
    }
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
      return;
    }
    
    // In a real app, this would update the backend
    setMessage({ type: 'success', text: 'Password updated successfully' });
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showCurrent: false,
      showNew: false,
      showConfirm: false
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, this would delete the account
      setMessage({ type: 'success', text: 'Account deletion request submitted' });
    }
  };

  const handleSaveSettings = () => {
    // In a real app, this would save all settings to the backend
    setMessage({ type: 'success', text: 'Settings saved successfully' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData(prev => ({ ...prev, profilePicture: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const navItems = [
    { id: 'account', label: 'Account', icon: <User size={20} /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'preferences', label: 'Preferences', icon: <SettingsIcon size={20} /> },
    { id: 'security', label: 'Security', icon: <Shield size={20} /> },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle size={20} /> }
  ];

  return (
    <div className={styles.settingsRoot}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageSubtitle}>Manage your account preferences and security settings</p>
        </div>

        {/* Settings Layout */}
        <div className={styles.settingsLayout}>
          {/* Sidebar Navigation */}
          <aside className={styles.sidebar}>
            <nav className={styles.sidebarNav}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.sidebarItem} ${activeTab === item.id ? styles.active : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            {/* Success/Error Messages */}
            {message.text && (
              <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                {message.text}
              </div>
            )}

            {/* Account Settings */}
            <div className={`${styles.tabContent} ${activeTab === 'account' ? styles.active : ''}`}>
              <h2 className={styles.sectionTitle}>Account Settings</h2>
              <p className={styles.sectionSubtitle}>Manage your profile information and account details</p>

              <div className={styles.settingsCard}>
                <h3 className={styles.cardTitle}>Profile Information</h3>
                <div className={styles.profileSection}>
                  <div className={styles.profilePicture}>
                    <img src={userData.profilePicture} alt="Profile" className={styles.profileImage} />
                    <label className={styles.uploadOverlay}>
                      <Camera size={16} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  <div>
                    <button className={styles.addPaymentBtn}>Change Photo</button>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Full Name</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={userData.name}
                      onChange={(e) => handleProfileUpdate('name', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address</label>
                    <input
                      type="email"
                      className={styles.formInput}
                      value={userData.email}
                      onChange={(e) => handleProfileUpdate('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone Number</label>
                  <input
                    type="tel"
                    className={styles.formInput}
                    value={userData.phone}
                    onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.settingsCard}>
                <h3 className={styles.cardTitle}>Password</h3>
                <p>Change your account password to keep your account secure.</p>
                <button 
                  className={styles.addPaymentBtn}
                  onClick={() => setShowPasswordModal(true)}
                >
                  Change Password
                </button>
              </div>

              <div className={styles.deleteAccountSection}>
                <h3 className={styles.deleteAccountTitle}>Delete Account</h3>
                <p className={styles.deleteAccountDescription}>
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className={styles.deleteAccountBtn} onClick={handleDeleteAccount}>
                  <Trash2 size={16} />
                  Delete Account
                </button>
              </div>
            </div>

            {/* Payment Settings */}
            <div className={`${styles.tabContent} ${activeTab === 'payment' ? styles.active : ''}`}>
              <h2 className={styles.sectionTitle}>Payment Settings</h2>
              <p className={styles.sectionSubtitle}>Manage your payment methods and view transaction history</p>

              <div className={styles.settingsCard}>
                <h3 className={styles.cardTitle}>Saved Payment Methods</h3>
                <div className={styles.paymentMethods}>
                  {paymentMethods.map(method => (
                    <div key={method.id} className={styles.paymentCard}>
                      <div className={styles.paymentInfo}>
                        <div className={styles.paymentIcon}>
                          {method.type}
                        </div>
                        <div className={styles.paymentDetails}>
                          <div className={styles.paymentType}>{method.type}</div>
                          <div className={styles.paymentNumber}>
                            {method.number}
                            {method.expiry && ` • Expires ${method.expiry}`}
                          </div>
                        </div>
                      </div>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => handlePaymentMethodRemove(method.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button className={styles.addPaymentBtn}>
                    <Plus size={16} />
                    Add Payment Method
                  </button>
                </div>
              </div>

              <div className={styles.settingsCard}>
                <h3 className={styles.cardTitle}>Transaction History</h3>
                <div className={styles.transactionHistory}>
                  {transactions.map(transaction => (
                    <div key={transaction.id} className={styles.transactionItem}>
                      <div className={styles.transactionInfo}>
                        <div className={styles.transactionTitle}>{transaction.title}</div>
                        <div className={styles.transactionDate}>{transaction.date}</div>
                      </div>
                      <div className={`${styles.transactionAmount} ${transaction.amount < 0 ? styles.negative : ''}`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className={`${styles.tabContent} ${activeTab === 'notifications' ? styles.active : ''}`}>
              <h2 className={styles.sectionTitle}>Notification Preferences</h2>
              <p className={styles.sectionSubtitle}>Choose how you want to be notified about important updates</p>

              <div className={styles.settingsCard}>
                <h3 className={styles.cardTitle}>Email Notifications</h3>
                <div className={styles.toggleContainer}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Session Reminders</div>
                    <div className={styles.toggleDescription}>Get email reminders before your scheduled sessions</div>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={notifications.emailReminders}
                      onChange={() => handleNotificationToggle('emailReminders')}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <div className={styles.toggleContainer}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Promotional Emails</div>
                    <div className={styles.toggleDescription}>Receive updates about new features and special offers</div>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={notifications.emailPromotional}
                      onChange={() => handleNotificationToggle('emailPromotional')}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.settingsCard}>
                <h3 className={styles.cardTitle}>SMS Alerts</h3>
                <div className={styles.toggleContainer}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Session Reminders</div>
                    <div className={styles.toggleDescription}>Get SMS reminders before your scheduled sessions</div>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={notifications.smsReminders}
                      onChange={() => handleNotificationToggle('smsReminders')}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.settingsCard}>
                <h3 className={styles.cardTitle}>In-App Notifications</h3>
                <div className={styles.toggleContainer}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Booking Updates</div>
                    <div className={styles.toggleDescription}>Receive notifications about booking confirmations and changes</div>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={notifications.inAppBookings}
                      onChange={() => handleNotificationToggle('inAppBookings')}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <div className={styles.toggleContainer}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>New Messages</div>
                    <div className={styles.toggleDescription}>Get notified when you receive new messages from tutors</div>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={notifications.inAppMessages}
                      onChange={() => handleNotificationToggle('inAppMessages')}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Preferences & Privacy */}
            <div className={`${styles.tabContent} ${activeTab === 'preferences' ? styles.active : ''}`}>
              <h2 className={styles.sectionTitle}>Preferences & Privacy</h2>
              <p className={styles.sectionSubtitle}>Customize your experience and manage privacy settings</p>

              <div className={styles.settingsCard}>
                <h3 className={styles.cardTitle}>Display Settings</h3>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Time Zone</label>
                  <select
                    className={styles.timezoneSelect}
                    value={userData.timezone}
                    onChange={(e) => handleProfileUpdate('timezone', e.target.value)}
                  >
                    {timezones.map(tz => (
                      <option key={tz.value} value={tz.value}>{tz.label}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Language</label>
                  <select
                    className={styles.languageSelect}
                    value={userData.language}
                    onChange={(e) => handleProfileUpdate('language', e.target.value)}
                  >
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.settingsCard}>
                <h3 className={styles.cardTitle}>Privacy Settings</h3>
                <div className={styles.toggleContainer}>
                  <div className={styles.toggleInfo}>
                    <div className={styles.toggleTitle}>Public Profile</div>
                    <div className={styles.toggleDescription}>Allow other users to see your profile information</div>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={userData.isPublicProfile}
                      onChange={(e) => handleProfileUpdate('isPublicProfile', e.target.checked)}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.settingsCard}>
                <h3 className={styles.cardTitle}>Blocked Tutors</h3>
                {blockedTutors.length > 0 ? (
                  <div className={styles.blockedTutors}>
                    {blockedTutors.map(tutor => (
                      <div key={tutor.id} className={styles.blockedTutor}>
                        <div className={styles.tutorInfo}>
                          <img src={tutor.avatar} alt={tutor.name} className={styles.tutorAvatar} />
                          <div className={styles.tutorDetails}>
                            <div className={styles.tutorName}>{tutor.name}</div>
                            <div className={styles.tutorSubject}>{tutor.subject}</div>
                          </div>
                        </div>
                        <button 
                          className={styles.unblockBtn}
                          onClick={() => handleBlockedTutorUnblock(tutor.id)}
                        >
                          Unblock
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No blocked tutors</p>
                )}
              </div>
            </div>

            {/* Security */}
            <div className={`${styles.tabContent} ${activeTab === 'security' ? styles.active : ''}`}>
              <h2 className={styles.sectionTitle}>Security Settings</h2>
              <p className={styles.sectionSubtitle}>Enhance your account security</p>

              <div className={styles.settingsCard}>
                <h3 className={styles.cardTitle}>Theme</h3>
                <div className={styles.themeToggle}>
                  <div className={styles.themeInfo}>
                    <div className={styles.themeTitle}>Appearance</div>
                    <div className={styles.themeDescription}>Choose your preferred theme</div>
                  </div>
                  <div className={styles.themeButtons}>
                    <button 
                      className={`${styles.themeBtn} ${userData.theme === 'light' ? styles.active : ''}`}
                      onClick={() => handleProfileUpdate('theme', 'light')}
                    >
                      Light
                    </button>
                    <button 
                      className={`${styles.themeBtn} ${userData.theme === 'dark' ? styles.active : ''}`}
                      onClick={() => handleProfileUpdate('theme', 'dark')}
                    >
                      Dark
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.settingsCard}>
                <div className={styles.twoFactorSection}>
                  <h3 className={styles.twoFactorTitle}>Two-Factor Authentication</h3>
                  <p className={styles.twoFactorDescription}>
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <button className={styles.enable2FABtn}>
                    <Lock size={16} />
                    {userData.twoFactorEnabled ? 'Manage 2FA' : 'Enable 2FA'}
                  </button>
                </div>
              </div>
            </div>

            {/* Help & Support */}
            <div className={`${styles.tabContent} ${activeTab === 'help' ? styles.active : ''}`}>
              <h2 className={styles.sectionTitle}>Help & Support</h2>
              <p className={styles.sectionSubtitle}>Get help and contact support</p>

              <div className={styles.settingsCard}>
                <div className={styles.helpSection}>
                  <a href="#" className={styles.helpLink}>
                    <div className={styles.helpInfo}>
                      <HelpCircle size={20} />
                      <div>
                        <div className={styles.helpTitle}>Help Center</div>
                        <div className={styles.helpDescription}>Browse our knowledge base and FAQs</div>
                      </div>
                    </div>
                    <ExternalLink size={16} />
                  </a>
                  <a href="#" className={styles.helpLink}>
                    <div className={styles.helpInfo}>
                      <Users size={20} />
                      <div>
                        <div className={styles.helpTitle}>Contact Support</div>
                        <div className={styles.helpDescription}>Get in touch with our support team</div>
                      </div>
                    </div>
                    <ExternalLink size={16} />
                  </a>
                  <a href="#" className={styles.helpLink}>
                    <div className={styles.helpInfo}>
                      <Globe size={20} />
                      <div>
                        <div className={styles.helpTitle}>Community Forum</div>
                        <div className={styles.helpDescription}>Connect with other students and tutors</div>
                      </div>
                    </div>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button className={styles.saveButton} onClick={handleSaveSettings}>
              <Save size={20} />
              Save Changes
            </button>
          </main>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className={styles.modal} onClick={() => setShowPasswordModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Change Password</h3>
                <button className={styles.closeBtn} onClick={() => setShowPasswordModal(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Current Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={passwordData.showCurrent ? 'text' : 'password'}
                      className={styles.formInput}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('showCurrent')}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {passwordData.showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={passwordData.showNew ? 'text' : 'password'}
                      className={styles.formInput}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('showNew')}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {passwordData.showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Confirm New Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={passwordData.showConfirm ? 'text' : 'password'}
                      className={styles.formInput}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('showConfirm')}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {passwordData.showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className={styles.reviewActions}>
                  <button className={styles.submitBtn} onClick={handlePasswordChange}>
                    Update Password
                  </button>
                  <button className={styles.cancelBtn} onClick={() => setShowPasswordModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 