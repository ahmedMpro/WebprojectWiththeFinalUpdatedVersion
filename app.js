// ============================================================
// SWAPIFY — Core Application Engine
// Modules: Store, Auth, Validation, UI, Favorites, Chat, Notifications
// ============================================================

(function() {
'use strict';

// ===== STORE (localStorage CRUD) =====
const Store = {
  get(key) { try { return JSON.parse(localStorage.getItem('swapify_' + key)); } catch { return null; } },
  set(key, val) { localStorage.setItem('swapify_' + key, JSON.stringify(val)); },
  remove(key) { localStorage.removeItem('swapify_' + key); },
  getSession() { return this.get('session'); },
  setSession(user) { this.set('session', { userId: user.id, email: user.email, name: user.name, role: user.role || 'user', loggedIn: true }); },
  clearSession() { this.remove('session'); }
};

// ===== SEED DATA =====
function seedData() {
  if (Store.get('seeded')) return;
  const users = [
    { id: 'u1', name: 'Sarah Jenkins', email: 'sarah@example.com', password: 'Test@1234', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200', bio: 'Sustainability enthusiast, amateur photographer, and language learner. 🌿📸', location: 'Brooklyn, NY', joined: 'Mar 2023', favorites: [], role: 'admin' },
    { id: 'u2', name: 'Carlos Martinez', email: 'carlos@example.com', password: 'Test@1234', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80', bio: 'Language teacher and coding enthusiast.', location: 'Online', joined: 'Jan 2024', favorites: [] },
    { id: 'u3', name: 'Miguel O\'Hara', email: 'miguel@example.com', password: 'Test@1234', avatar: 'https://i.pravatar.cc/150?img=11', bio: 'Spanish tutor.', location: 'Madrid', joined: 'Feb 2024', favorites: [] },
    { id: 'u4', name: 'Alex Mercer', email: 'alex@example.com', password: 'Test@1234', avatar: 'https://i.pravatar.cc/150?img=12', bio: 'Sneakerhead and trader.', location: 'LA', joined: 'Dec 2023', favorites: [] }
  ];
  const items = [
    { id: 'i1', title: 'Vintage Camera', description: 'Classic film camera in excellent condition. Perfect for photography enthusiasts.', category: 'Electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400&h=300', type: 'swap', condition: 'Like New', distance: '2.5 km', owner: 'u1', rating: 4.8 },
    { id: 'i2', title: 'Spanish Lessons', description: 'Intermediate Spanish conversation practice sessions.', category: 'Language', image: 'https://images.unsplash.com/photo-1542903660-eedba2a40fc5?auto=format&fit=crop&q=80&w=400&h=300', type: 'skill', condition: 'Intermediate', distance: 'Online', owner: 'u3', rating: 5.0 },
    { id: 'i3', title: 'Nike Air Max', description: 'Gently used Nike Air Max, size 10. Great condition.', category: 'Fashion', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=400&h=300', type: 'deal', condition: 'Good', distance: '1.2 km', owner: 'u4', price: 45, originalPrice: 90, rating: 4.5 },
    { id: 'i4', title: 'Wooden Desk', description: 'Solid oak desk, sturdy and stylish. Minor scratches.', category: 'Furniture', image: 'https://images.unsplash.com/photo-1588690155458-7c85848bb2ce?auto=format&fit=crop&q=80&w=400&h=300', type: 'swap', condition: 'Fair', distance: '5.0 km', owner: 'u1', rating: 4.2 },
    { id: 'i5', title: 'Acoustic Guitar', description: 'Yamaha acoustic guitar, perfect for beginners.', category: 'Music', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=400&h=300', type: 'swap', condition: 'Good', distance: '3.1 km', owner: 'u2', rating: 4.6 },
    { id: 'i6', title: 'Leather Backpack', description: 'Premium leather backpack, barely used.', category: 'Fashion', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400&h=300', type: 'deal', condition: 'Like New', distance: '0.8 km', owner: 'u4', price: 35, originalPrice: 70, rating: 4.7 }
  ];
  const skills = [
    { id: 's1', userId: 'u2', offers: 'Spanish Lessons', requests: 'Coding Basics', level: 'Expert', location: 'Online', rating: 5.0 },
    { id: 's2', userId: 'u1', offers: 'Photography', requests: 'Graphic Design', level: 'Intermediate', location: 'New York, 2km', rating: 4.8 },
    { id: 's3', userId: 'u2', offers: 'React Dev', requests: 'UI/UX Design', level: 'Expert', location: 'Online', rating: 4.9 },
    { id: 's4', userId: 'u1', offers: 'Yoga Flow', requests: 'French Lessons', level: 'Advanced', location: 'London, 5km', rating: 4.7 },
    { id: 's5', userId: 'u4', offers: 'Guitar Basics', requests: 'Video Editing', level: 'Beginner', location: 'Online', rating: 4.5 },
    { id: 's6', userId: 'u1', offers: 'SEO Marketing', requests: 'Content Writing', level: 'Expert', location: 'Dubai, 10km', rating: 4.9 }
  ];
  const messages = [
    { id: 'm1', sender: 'u1', receiver: 'u2', text: 'Hi there! I saw your listing for the vintage camera.', timestamp: Date.now() - 720000 },
    { id: 'm2', sender: 'u1', receiver: 'u2', text: 'Is it still available?', timestamp: Date.now() - 660000 },
    { id: 'm3', sender: 'u2', receiver: 'u1', text: 'Hello Sarah! Yes, it\'s still available.', timestamp: Date.now() - 420000 },
    { id: 'm4', sender: 'u2', receiver: 'u1', text: 'Are you interested in swapping or buying?', timestamp: Date.now() - 360000 },
    { id: 'm5', sender: 'u1', receiver: 'u2', text: 'I\'d love to swap! I have a slightly used acoustic guitar.', timestamp: Date.now() - 180000 },
    { id: 'm6', sender: 'u1', receiver: 'u2', text: 'Let me send you some pictures.', timestamp: Date.now() - 120000 }
  ];
  const notifications = [
    { id: 'n1', userId: 'u2', type: 'message', content: 'Sarah Jenkins sent you a message', link: 'messages.html', isRead: false, createdAt: Date.now() - 120000 },
    { id: 'n2', userId: 'u2', type: 'match', content: 'New skill match found: Photography ↔ Graphic Design', link: 'skills.html', isRead: false, createdAt: Date.now() - 3600000 },
    { id: 'n3', userId: 'u2', type: 'deal', content: 'Your deal "Nike Air Max" was viewed 15 times', link: 'deals.html', isRead: true, createdAt: Date.now() - 86400000 }
  ];
  const swaps = [
    { id: 'sw1', fromUserId: 'u2', toUserId: 'u1', skillId: 's2', fromName: 'Carlos Martinez', toName: 'Sarah Jenkins', status: 'pending', createdAt: Date.now() - 86400000 }
  ];
  const reports = [
    { id: 'r1', type: 'user', targetId: 'u4', reporterId: 'u1', reason: 'Spamming messages', status: 'open', createdAt: Date.now() - 4000000 }
  ];
  Store.set('users', users);
  Store.set('items', items);
  Store.set('skills', skills);
  Store.set('messages', messages);
  Store.set('notifications', notifications);
  Store.set('swaps', swaps);
  Store.set('reports', reports);
  Store.set('seeded', true);
}

// ===== AUTH =====
const Auth = {
  register(name, email, password) {
    const users = Store.get('users') || [];
    if (users.find(u => u.email === email)) return { success: false, error: 'Email already registered' };
    const user = { id: 'u' + Date.now(), name, email, password, avatar: 'https://i.pravatar.cc/150?u=' + email, bio: '', location: '', joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), favorites: [] };
    users.push(user);
    Store.set('users', users);
    Store.setSession(user);
    return { success: true, user };
  },
  login(email, password) {
    const users = Store.get('users') || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Incorrect email or password' };
    Store.setSession(user);
    return { success: true, user };
  },
  logout() { Store.clearSession(); window.location.href = 'login.html'; },
  isLoggedIn() { const s = Store.getSession(); return s && s.loggedIn; },
  currentUser() {
    const s = Store.getSession();
    if (!s) return null;
    const users = Store.get('users') || [];
    return users.find(u => u.id === s.userId) || null;
  },
  updateUser(data) {
    const s = Store.getSession();
    if (!s) return false;
    const users = Store.get('users') || [];
    const idx = users.findIndex(u => u.id === s.userId);
    if (idx === -1) return false;
    Object.assign(users[idx], data);
    Store.set('users', users);
    return true;
  }
};

// ===== VALIDATION =====
const Validate = {
  email(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
  required(v) { return v && v.trim().length > 0; },
  minLength(v, n) { return v && v.trim().length >= n; },
  passwordStrength(v) {
    if (!v || v.length < 8) return 'weak';
    let score = 0;
    if (/[a-z]/.test(v)) score++;
    if (/[A-Z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^a-zA-Z0-9]/.test(v)) score++;
    if (v.length >= 12) score++;
    return score <= 2 ? 'weak' : score <= 3 ? 'medium' : 'strong';
  },
  passwordValid(v) { return v && v.length >= 8 && /[a-z]/.test(v) && /[A-Z]/.test(v) && /[0-9]/.test(v) && /[^a-zA-Z0-9]/.test(v); },
  match(a, b) { return a === b; },
  name(v) { return v && v.trim().length >= 2 && !/^\d+$/.test(v.trim()); },
  sanitize(v) { const d = document.createElement('div'); d.textContent = v; return d.innerHTML; }
};

// ===== UI HELPERS =====
const UI = {
  // Toast system
  toast(message, type, link) {
    type = type || 'info';
    let container = document.querySelector('.toast-container');
    if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
    toast.innerHTML = '<span style="font-size:18px">' + (icons[type] || 'ℹ') + '</span><span>' + message + '</span><span class="toast-close" onclick="this.parentElement.remove()">✕</span>';
    container.appendChild(toast);
    setTimeout(function() { toast.style.opacity = '0'; toast.style.transform = 'translateX(100px)'; setTimeout(function() { toast.remove(); }, 300); }, 4000);

    const user = Auth.currentUser();
    if (user && (type === 'error' || type === 'warning' || type === 'info' || type === 'success')) {
      const notifs = Store.get('notifications') || [];
      notifs.push({
        id: 'n' + Date.now() + Math.random().toString(36).slice(2),
        userId: user.id,
        type: 'alert',
        content: message,
        link: link || '',
        isRead: false,
        createdAt: Date.now()
      });
      Store.set('notifications', notifs);
      if (typeof this.updateNav === 'function') this.updateNav();
    }
  },

  // Modal
  showModal(title, bodyHtml, footerHtml) {
    let overlay = document.querySelector('.modal-overlay');
    if (!overlay) { overlay = document.createElement('div'); overlay.className = 'modal-overlay'; overlay.innerHTML = '<div class="modal"><div class="modal-header"><h2></h2><button class="btn btn-ghost btn-icon modal-close">&times;</button></div><div class="modal-body"></div><div class="modal-footer"></div></div>'; document.body.appendChild(overlay); overlay.querySelector('.modal-close').onclick = function() { UI.closeModal(); }; overlay.onclick = function(e) { if (e.target === overlay) UI.closeModal(); }; }
    overlay.querySelector('.modal-header h2').textContent = title;
    overlay.querySelector('.modal-body').innerHTML = bodyHtml || '';
    overlay.querySelector('.modal-footer').innerHTML = footerHtml || '';
    overlay.classList.add('active');
  },
  closeModal() { const o = document.querySelector('.modal-overlay'); if (o) o.classList.remove('active'); },

  // Loading state
  setLoading(btn, loading) {
    if (loading) { btn.dataset.originalText = btn.innerHTML; btn.innerHTML = '<span style="display:inline-block;width:18px;height:18px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite"></span>'; btn.disabled = true; }
    else { btn.innerHTML = btn.dataset.originalText || btn.innerHTML; btn.disabled = false; }
  },

  // Shake animation on element
  shake(el) { el.style.animation = 'shake 0.5s'; setTimeout(function() { el.style.animation = ''; }, 500); },

  // Ripple effect on button
  addRipple(e) {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(function() { ripple.remove(); }, 600);
  },

  // Update header based on auth state
  updateNav() {
    const profileRings = document.querySelectorAll('.profile-ring img');
    const user = Auth.currentUser();
    if (user) {
      profileRings.forEach(function(img) { img.src = user.avatar; img.alt = user.name; });
    }
    // Update notification badge
    if (user) {
      const notifs = (Store.get('notifications') || []).filter(function(n) { return n.userId === user.id && !n.isRead; });
      
      const notifBtns = document.querySelectorAll('a[href="notifications.html"], #notifBtn');
      notifBtns.forEach(function(btn) {
        btn.style.position = 'relative';
        if (!btn.querySelector('.notification-dot')) {
          const dot = document.createElement('span');
          dot.className = 'notification-dot';
          btn.appendChild(dot);
        }
      });

      const dots = document.querySelectorAll('.notification-dot');
      dots.forEach(function(d) { d.style.display = notifs.length > 0 ? 'block' : 'none'; });
    }
  }
};

// Override native alert to use UI.toast
window.alert = function(msg) {
  if (typeof UI !== 'undefined' && UI.toast) {
    UI.toast(msg, 'warning');
  } else {
    console.warn('Alert:', msg);
  }
};

// ===== FAVORITES =====
const Favorites = {
  toggle(itemId) {
    const user = Auth.currentUser();
    if (!user) { UI.toast('Please log in to add favorites', 'warning'); return false; }
    const users = Store.get('users') || [];
    const idx = users.findIndex(function(u) { return u.id === user.id; });
    if (idx === -1) return false;
    if (!users[idx].favorites) users[idx].favorites = [];
    const favIdx = users[idx].favorites.indexOf(itemId);
    if (favIdx > -1) { users[idx].favorites.splice(favIdx, 1); Store.set('users', users); return false; }
    else { users[idx].favorites.push(itemId); Store.set('users', users); return true; }
  },
  isFavorited(itemId) {
    const user = Auth.currentUser();
    if (!user) return false;
    return (user.favorites || []).indexOf(itemId) > -1;
  },
  getAll() {
    const user = Auth.currentUser();
    if (!user) return [];
    const items = Store.get('items') || [];
    return items.filter(function(i) { return (user.favorites || []).indexOf(i.id) > -1; });
  }
};

// ===== CHAT =====
const Chat = {
  // Stable thread ID: sort the two user IDs so the key is always the same
  threadId(userId, partnerId) {
    return [userId, partnerId].sort().join('__');
  },
  // Return all threads for a user, enriched with partner info + last message
  getThreads(userId) {
    const msgs   = Store.get('messages') || [];
    const users  = Store.get('users')   || [];
    const map    = {};
    msgs.forEach(function(m) {
      if (m.sender !== userId && m.receiver !== userId) return;
      const partnerId = m.sender === userId ? m.receiver : m.sender;
      const tid = Chat.threadId(userId, partnerId);
      if (!map[tid]) {
        const partner = users.find(function(u) { return u.id === partnerId; });
        if (!partner) return; // skip unknown users — no "Unknown"
        map[tid] = { tid: tid, partnerId: partnerId, partner: partner, messages: [], lastMessage: null };
      }
      map[tid].messages.push(m);
      if (!map[tid].lastMessage || m.timestamp > map[tid].lastMessage.timestamp) {
        map[tid].lastMessage = m;
      }
    });
    return Object.values(map).sort(function(a, b) {
      return (b.lastMessage ? b.lastMessage.timestamp : 0) - (a.lastMessage ? a.lastMessage.timestamp : 0);
    });
  },
  // Get or create an empty thread entry (no messages yet)
  ensureThread(userId, partnerId) {
    const users = Store.get('users') || [];
    return users.find(function(u) { return u.id === partnerId; }) || null;
  },
  // Return messages between two users, sorted ascending
  getMessages(userId, partnerId) {
    const msgs = Store.get('messages') || [];
    return msgs.filter(function(m) {
      return (m.sender === userId && m.receiver === partnerId) ||
             (m.sender === partnerId && m.receiver === userId);
    }).sort(function(a, b) { return a.timestamp - b.timestamp; });
  },
  send(senderId, receiverId, text) {
    if (!text || !text.trim()) return null;
    const msgs = Store.get('messages') || [];
    const msg = {
      id: 'm' + Date.now() + Math.random().toString(36).slice(2),
      sender: senderId,
      receiver: receiverId,
      text: Validate.sanitize(text.trim()),
      timestamp: Date.now(),
      status: 'sent'
    };
    msgs.push(msg);
    Store.set('messages', msgs);
    // Notification
    const notifs = Store.get('notifications') || [];
    const senderUser = (Store.get('users') || []).find(function(u) { return u.id === senderId; });
    notifs.push({
      id: 'n' + Date.now() + Math.random().toString(36).slice(2),
      userId: receiverId,
      type: 'message',
      content: (senderUser ? senderUser.name : 'Someone') + ' sent you a message',
      link: 'messages.html?partner=' + senderId,
      isRead: false,
      createdAt: Date.now()
    });
    Store.set('notifications', notifs);
    return msg;
  }
};

// ===== NOTIFICATIONS =====
const Notifications = {
  getForUser(userId) {
    return (Store.get('notifications') || []).filter(function(n) { return n.userId === userId; }).sort(function(a, b) { return b.createdAt - a.createdAt; });
  },
  markRead(notifId) {
    const notifs = Store.get('notifications') || [];
    const n = notifs.find(function(n) { return n.id === notifId; });
    if (n) { n.isRead = true; Store.set('notifications', notifs); }
  },
  markAllRead(userId) {
    const notifs = Store.get('notifications') || [];
    notifs.forEach(function(n) { if (n.userId === userId) n.isRead = true; });
    Store.set('notifications', notifs);
  },
  unreadCount(userId) {
    return (Store.get('notifications') || []).filter(function(n) { return n.userId === userId && !n.isRead; }).length;
  }
};

// ===== SEARCH =====
const Search = {
  items(query) {
    const allItems = Store.get('items') || [];
    if (!query || !query.trim()) return allItems;
    const q = query.toLowerCase().trim();
    return allItems.filter(function(i) {
      return i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
    });
  },
  skills(query) {
    const allSkills = Store.get('skills') || [];
    if (!query || !query.trim()) return allSkills;
    const q = query.toLowerCase().trim();
    return allSkills.filter(function(s) {
      return s.offers.toLowerCase().includes(q) || s.requests.toLowerCase().includes(q);
    });
  }
};

// ===== ADMIN =====
const Admin = {
  requireAdmin() {
    // Dual-layer check: session must declare admin role AND user record must confirm it.
    const session = Store.getSession();
    if (!session || session.role !== 'admin') {
      window.location.href = 'login.html';
      return false;
    }
    const user = Auth.currentUser();
    if (!user || user.role !== 'admin') {
      Store.clearSession(); // tampered session — wipe it
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },
  verifyPin(pin) {
    const ADMIN_PIN = Store.get('adminPin') || '2580';
    return String(pin) === String(ADMIN_PIN);
  },
  getAllUsers() { return Store.get('users') || []; },
  banUser(uid) {
    const users = Store.get('users') || [];
    const idx = users.findIndex(u => u.id === uid);
    if (idx > -1) {
      users[idx].status = 'banned';
      Store.set('users', users);
      this.notify(uid, 'admin', 'Your account has been banned due to policy violations.', 'profile.html');
    }
  },
  suspendUser(uid) {
    const users = Store.get('users') || [];
    const idx = users.findIndex(u => u.id === uid);
    if (idx > -1) {
      users[idx].status = 'suspended';
      Store.set('users', users);
      this.notify(uid, 'admin', 'Your account has been suspended.', 'profile.html');
    }
  },
  activateUser(uid) {
    const users = Store.get('users') || [];
    const idx = users.findIndex(u => u.id === uid);
    if (idx > -1) {
      users[idx].status = 'active';
      Store.set('users', users);
      this.notify(uid, 'admin', 'Your account has been reactivated.', 'profile.html');
    }
  },
  deleteUser(uid) {
    let users = Store.get('users') || [];
    users = users.filter(u => u.id !== uid);
    Store.set('users', users);
  },
  getAllSkills() { return Store.get('skills') || []; },
  approveSkill(sid) {
    const skills = Store.get('skills') || [];
    const idx = skills.findIndex(s => s.id === sid);
    if (idx > -1) {
      skills[idx].status = 'active'; // Approved means active
      Store.set('skills', skills);
      this.notify(skills[idx].userId, 'admin', 'Your skill "' + skills[idx].offers + '" was approved!', 'skills.html');
    }
  },
  rejectSkill(sid) {
    const skills = Store.get('skills') || [];
    const idx = skills.findIndex(s => s.id === sid);
    if (idx > -1) {
      skills[idx].status = 'rejected';
      Store.set('skills', skills);
      this.notify(skills[idx].userId, 'admin', 'Your skill "' + skills[idx].offers + '" was rejected.', 'skills.html');
    }
  },
  getAllSwaps() { return Store.get('swaps') || []; },
  cancelSwap(sid) {
    const swaps = Store.get('swaps') || [];
    const idx = swaps.findIndex(s => s.id === sid);
    if (idx > -1) {
      swaps[idx].status = 'cancelled';
      Store.set('swaps', swaps);
      this.notify(swaps[idx].fromUserId, 'admin', 'Your swap has been canceled by an admin.', 'messages.html');
      this.notify(swaps[idx].toUserId, 'admin', 'Your swap has been canceled by an admin.', 'messages.html');
    }
  },
  flagSwap(sid) {
    const swaps = Store.get('swaps') || [];
    const idx = swaps.findIndex(s => s.id === sid);
    if (idx > -1) {
      swaps[idx].flagged = true;
      Store.set('swaps', swaps);
    }
  },
  getAllReports() { return Store.get('reports') || []; },
  resolveReport(rid, action, tid) {
    const reports = Store.get('reports') || [];
    const idx = reports.findIndex(r => r.id === rid);
    if (idx > -1) {
      reports[idx].status = 'resolved';
      Store.set('reports', reports);
      if (action === 'warn') this.notify(tid, 'admin', 'Warning: You have been reported for inappropriate behavior.', 'profile.html');
      else if (action === 'ban') this.banUser(tid);
    }
  },
  addReport(type, targetId, reporterId, reason) {
    const reports = Store.get('reports') || [];
    reports.push({ id: 'r' + Date.now(), type, targetId, reporterId, reason, status: 'open', createdAt: Date.now() });
    Store.set('reports', reports);
  },
  notify(userId, type, content, link) {
    const notifs = Store.get('notifications') || [];
    notifs.push({ id: 'n' + Date.now() + Math.random(), userId, type, content, link, isRead: false, createdAt: Date.now() });
    Store.set('notifications', notifs);
  }
};

// ===== API (Server Mock) =====
const API = {
  createListing(data) {
    // Server-side enforcement required
    if (!data.title || data.title.trim() === '') return { success: false, error: 'Item title is required.' };
    if (!data.description || data.description.trim() === '') return { success: false, error: 'Item description is required.' };
    if (!data.images || data.images.length === 0) return { success: false, error: 'Item image is required.' };
    
    // Validate that the file is of an appropriate image type
    const validExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    for (let i = 0; i < data.images.length; i++) {
      const img = data.images[i];
      if (!img || !img.name) return { success: false, error: 'Invalid image file uploaded.' };
      
      const parts = img.name.split('.');
      const ext = parts[parts.length - 1].toLowerCase();
      if (!validExtensions.includes(ext)) {
        return { success: false, error: 'File must be an appropriate image type (JPG, PNG, WEBP).' };
      }
    }

    // Success, save to store
    const items = Store.get('items') || [];
    const newItem = {
      id: 'i' + Date.now(),
      title: Validate.sanitize(data.title.trim()),
      description: Validate.sanitize(data.description.trim()),
      category: 'General',
      image: data.images[0].url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400&h=400',
      type: data.type,
      condition: data.condition || 'New',
      distance: '0 km',
      owner: Auth.isLoggedIn() ? Auth.currentUser().id : 'u1',
      rating: 0
    };
    items.push(newItem);
    Store.set('items', items);
    return { success: true, item: newItem };
  }
};
// ===== THEME =====
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('swapify_theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}


// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const iconOpen = document.getElementById('menuIconOpen');
  const iconClose = document.getElementById('menuIconClose');
  if (!menu) return;
  const isOpen = menu.classList.toggle('open');
  if (iconOpen) iconOpen.style.display = isOpen ? 'none' : 'block';
  if (iconClose) iconClose.style.display = isOpen ? 'block' : 'none';
}

// ===== ESCAPE HTML =====
function escapeHtml(text) { var d = document.createElement('div'); d.textContent = text; return d.innerHTML; }

// ===== PHOTO COUNT =====
function updatePhotoCount() {
  var grid = document.getElementById('photoGrid');
  var counter = document.getElementById('photoCount');
  if (grid && counter) { var count = grid.querySelectorAll('.photo-item').length; counter.textContent = count; var addLabel = grid.querySelector('.photo-add'); if (addLabel) addLabel.style.display = count >= 5 ? 'none' : 'flex'; }
}

// ===== INIT ON LOAD =====
document.addEventListener('DOMContentLoaded', function() {
  // Seed data
  seedData();

  // Restore theme
  var savedTheme = localStorage.getItem('swapify_theme');
  if (savedTheme === 'dark') { document.documentElement.classList.add('dark'); var btn = document.getElementById('themeToggle'); if (btn) btn.textContent = '☀️'; }

  // Ensure notification buttons have IDs
  document.querySelectorAll('.header-actions button:not([id])').forEach(function(btn) {
    if (btn.innerHTML.includes('M6 8a6')) {
      btn.id = 'notifBtn';
    }
  });

  // Update nav for logged in user
  UI.updateNav();

  // Set active nav link
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function(link) { var href = link.getAttribute('href'); link.classList.toggle('active', href === currentPage); });
  document.querySelectorAll('.bottom-nav a').forEach(function(link) { var href = link.getAttribute('href'); if (href !== '#') link.classList.toggle('active', href === currentPage); });

  // Fade-in on scroll
  var fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) { entries.forEach(function(entry) { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
    fadeEls.forEach(function(el) { observer.observe(el); });
  } else { fadeEls.forEach(function(el) { el.classList.add('visible'); }); }

  // Responsive elements
  function handleResize() {
    var w = window.innerWidth;
    var vd = document.getElementById('viewAllDesktop');
    var vm = document.getElementById('viewAllMobile');
    if (vd) vd.style.display = w >= 768 ? 'inline-flex' : 'none';
    if (vm) vm.style.display = w < 768 ? 'block' : 'none';
    // Show back button on mobile for chat
    var backBtn = document.getElementById('chatBackBtn');
    if (backBtn) backBtn.style.display = w < 768 ? 'flex' : 'none';
  }
  handleResize();
  window.addEventListener('resize', handleResize);

  // ===== RIPPLE EFFECT ON ALL BUTTONS =====
  document.querySelectorAll('.btn').forEach(function(btn) { btn.addEventListener('click', UI.addRipple); });

  // ===== FAVORITES / HEART BUTTONS =====
  // Set initial active state for static cards
  document.querySelectorAll('.item-card-fav').forEach(function(btn) {
    var card = btn.closest('.item-card') || btn.closest('[data-item-id]');
    var itemId = card ? card.dataset.itemId : null;
    if (!itemId) {
      var title = card ? (card.querySelector('.item-card-title') || {}).textContent : '';
      var items = [].concat(Store.get('items') || [], Store.get('objects') || [], Store.get('deals') || [], Store.get('skills') || []);
      var match = items.find(function(i) { return (i.title || i.name) === title; });
      if (match) itemId = match.id;
      if (!itemId && title) itemId = 'static_' + title.replace(/\s+/g, '_').toLowerCase();
    }
    if (itemId && Favorites.isFavorited(itemId)) { btn.classList.add('active'); }
  });
  // Use event delegation for dynamically added cards
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.item-card-fav');
    if (!btn) return;
    e.preventDefault(); e.stopPropagation();
    
    var card = btn.closest('.item-card') || btn.closest('[data-item-id]');
    var itemId = card ? card.dataset.itemId : null;
    if (!itemId) {
      var title = card ? (card.querySelector('.item-card-title') || {}).textContent : '';
      var items = [].concat(Store.get('items') || [], Store.get('objects') || [], Store.get('deals') || [], Store.get('skills') || []);
      var match = items.find(function(i) { return (i.title || i.name) === title; });
      if (match) itemId = match.id;
      if (!itemId && title) itemId = 'static_' + title.replace(/\s+/g, '_').toLowerCase();
    }
    
    if (!itemId) return;
    var isFav = Favorites.toggle(itemId);
    btn.classList.toggle('active', isFav);
    btn.classList.add('heart-pop');
    setTimeout(function() { btn.classList.remove('heart-pop'); }, 300);
    UI.toast(isFav ? 'Added to favorites ❤️' : 'Removed from favorites', isFav ? 'success' : 'info');
  });

  // ===== SWAP REQUEST BUTTONS =====
  document.querySelectorAll('[data-swap-btn]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (!Auth.isLoggedIn()) { UI.toast('Please log in to request a swap', 'warning'); return; }
      var original = btn.getAttribute('data-original') || btn.textContent;
      if (!btn.getAttribute('data-original')) btn.setAttribute('data-original', original);
      btn.innerHTML = '✓ Swap Requested!';
      btn.style.background = 'var(--success)';
      btn.style.color = '#fff';
      btn.disabled = true;
      
      var itemId = btn.dataset.itemId || btn.closest('[data-item-id]')?.dataset.itemId || new URLSearchParams(window.location.search).get('id');
      var typeStr = window.location.pathname.includes('skill') ? 'skill' : 'item';
      var link = itemId ? typeStr + '-details.html?id=' + itemId : window.location.href;
      
      UI.toast('Swap request sent! 🔄', 'success', link);
      setTimeout(function() { btn.textContent = original; btn.style.background = ''; btn.style.color = ''; btn.disabled = false; }, 3000);
    });
  });

  // ===== PROFILE TABS =====
  document.querySelectorAll('.tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = tab.getAttribute('data-tab');
      document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
      var content = document.getElementById('tab-' + target);
      if (content) content.classList.add('active');
    });
  });

  // ===== ADD ITEM TYPE SELECTOR =====
  document.querySelectorAll('.type-option').forEach(function(opt) {
    opt.addEventListener('click', function() {
      document.querySelectorAll('.type-option').forEach(function(o) { o.classList.remove('active'); });
      opt.classList.add('active');
      var type = opt.getAttribute('data-type');
      var condField = document.getElementById('conditionField');
      var priceFields = document.getElementById('priceFields');
      if (condField) condField.style.display = (type === 'skill') ? 'none' : 'flex';
      if (priceFields) priceFields.style.display = (type === 'deal') ? 'grid' : 'none';
    });
  });

  // ===== MESSAGES CHAT =====
  var chatItems = document.querySelectorAll('.chat-item');
  chatItems.forEach(function(item) {
    item.addEventListener('click', function() {
      chatItems.forEach(function(i) { i.classList.remove('active'); });
      item.classList.add('active');
      var sidebar = document.querySelector('.messages-sidebar');
      var chat = document.querySelector('.messages-chat');
      if (window.innerWidth < 768 && sidebar && chat) { sidebar.classList.add('hidden-mobile'); chat.classList.remove('hidden-mobile'); }
    });
  });

  // Back button in chat
  var backBtn = document.getElementById('chatBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      var sidebar = document.querySelector('.messages-sidebar');
      var chat = document.querySelector('.messages-chat');
      if (sidebar && chat) { sidebar.classList.remove('hidden-mobile'); chat.classList.add('hidden-mobile'); }
    });
  }

  // Send message
  var chatForm = document.getElementById('chatForm');
  var chatInput = document.getElementById('chatInput');
  var chatMessages = document.getElementById('chatMessages');
  if (chatForm && chatInput && chatMessages) {
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var text = chatInput.value.trim();
      if (!text) { UI.toast('Cannot send empty message', 'warning'); UI.shake(chatInput); return; }
      var now = new Date();
      var time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      var msgHtml = '<div class="message sent"><div><div class="message-bubble">' + escapeHtml(text) + '</div><div class="message-time">' + time + ' <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></div></div></div>';
      chatMessages.insertAdjacentHTML('beforeend', msgHtml);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate reply after delay
      setTimeout(function() {
        var replies = ['Sounds great! Let me check.', 'That works for me! 😊', 'Sure, let\'s set up a time to meet.', 'I\'ll get back to you soon!', 'Perfect, thanks for the info!'];
        var reply = replies[Math.floor(Math.random() * replies.length)];
        var replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var replyHtml = '<div class="message received"><div><div class="message-bubble">' + reply + '</div><div class="message-time">' + replyTime + '</div></div></div>';
        chatMessages.insertAdjacentHTML('beforeend', replyHtml);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1500 + Math.random() * 2000);
    });
  }

  // ===== ADD ITEM FORM =====
  var addForm = document.getElementById('addItemForm');
  if (addForm) {
    var submitBtn = addForm.querySelector('button[type="submit"]');
    addForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var title = document.getElementById('itemTitle');
      var desc = document.getElementById('itemDesc');
      var photoGrid = document.getElementById('photoGrid');
      var photoItems = photoGrid ? photoGrid.querySelectorAll('.photo-item') : [];
      var errors = [];
      document.querySelectorAll('.form-error').forEach(function(el) { el.textContent = ''; });
      
      if (!title || !title.value.trim()) {
        errors.push({ el: 'titleError', msg: 'Title is required', input: title });
      }
      
      if (!desc || !desc.value.trim()) {
        errors.push({ el: 'descError', msg: 'Description is required', input: desc });
      }

      var images = [];
      if (photoItems.length === 0) {
        errors.push({ el: 'photoError', msg: 'At least one photo is required' });
      } else {
        var validExtensions = ['jpg', 'jpeg', 'png', 'webp'];
        var hasInvalidImage = false;
        photoItems.forEach(function(item) {
          var fileName = item.dataset.fileName;
          if (fileName) {
            var ext = fileName.split('.').pop().toLowerCase();
            if (!validExtensions.includes(ext)) {
              hasInvalidImage = true;
            }
          } else {
            // default mock if added via UI mock
            fileName = 'mock.jpg';
          }
          images.push({ name: fileName, url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400&h=400' });
        });
        
        if (hasInvalidImage) {
          errors.push({ el: 'photoError', msg: 'Invalid image type. Only JPG, PNG, and WEBP are allowed.' });
        }
      }

      if (errors.length) {
        errors.forEach(function(err) { 
          var el = document.getElementById(err.el); 
          if (el) el.textContent = err.msg; 
          if (err.input) { err.input.classList.add('invalid'); err.input.classList.remove('valid'); } 
        });
        UI.shake(addForm);
        UI.toast('Please fix the errors', 'error');
        return;
      }

      var activeType = document.querySelector('.type-option.active');
      var type = activeType ? activeType.dataset.type : 'swap';
      var conditionEl = document.getElementById('itemCondition');
      var condition = conditionEl ? conditionEl.value : 'New';

      var listingData = {
        title: title.value,
        description: desc.value,
        images: images,
        type: type,
        condition: condition
      };

      if (submitBtn) submitBtn.disabled = true;

      // API Server Mock validation
      var result = API.createListing(listingData);
      
      if (!result.success) {
        if (submitBtn) submitBtn.disabled = false;
        UI.toast(result.error, 'error');
        UI.shake(addForm);
        return;
      }

      UI.toast('Listing published successfully! 🎉', 'success');
      setTimeout(function() { window.location.href = type === 'skill' ? 'skills.html' : type === 'deal' ? 'deals.html' : 'objects.html'; }, 1500);
    });
  }

  // ===== REAL-TIME INPUT VALIDATION =====
  document.querySelectorAll('[data-validate]').forEach(function(input) {
    input.addEventListener('input', function() {
      var type = input.dataset.validate;
      var val = input.value;
      var valid = false;
      if (type === 'email') valid = Validate.email(val);
      else if (type === 'password') valid = Validate.passwordValid(val);
      else if (type === 'name') valid = Validate.name(val);
      else if (type === 'required') valid = Validate.required(val);
      else if (type === 'confirm-password') { var pw = document.getElementById('password') || document.getElementById('regPassword'); valid = pw && Validate.match(val, pw.value); }
      input.classList.toggle('valid', valid);
      input.classList.toggle('invalid', val.length > 0 && !valid);
      // Update error message
      var errEl = input.parentElement.querySelector('.form-error') || input.closest('.form-group') && input.closest('.form-group').querySelector('.form-error');
      if (errEl) { errEl.textContent = val.length > 0 && !valid ? input.dataset.errorMsg || 'Invalid input' : ''; }
      // Password strength meter
      if (type === 'password') {
        var meter = document.querySelector('.password-strength');
        var text = document.querySelector('.strength-text');
        if (meter) { var str = Validate.passwordStrength(val); meter.className = 'password-strength ' + str; if (text) text.textContent = val.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : ''; }
      }
    });
  });

  // ===== LOGIN FORM =====
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = document.getElementById('loginEmail');
      var password = document.getElementById('loginPassword');
      var hasError = false;
      if (!Validate.email(email.value)) { email.classList.add('invalid'); hasError = true; }
      if (!Validate.required(password.value)) { password.classList.add('invalid'); hasError = true; }
      if (hasError) { UI.shake(loginForm); UI.toast('Please fill in all fields correctly', 'error'); return; }
      var submitBtn = loginForm.querySelector('button[type="submit"]');
      UI.setLoading(submitBtn, true);
      setTimeout(function() {
        var result = Auth.login(email.value.trim(), password.value);
        UI.setLoading(submitBtn, false);
        if (result.success) { UI.toast('Welcome back! 🎉', 'success'); setTimeout(function() { window.location.href = 'index.html'; }, 1000); }
        else { UI.toast(result.error, 'error'); UI.shake(loginForm); }
      }, 800);
    });
  }

  // ===== REGISTER FORM =====
  var registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('regName');
      var email = document.getElementById('regEmail');
      var password = document.getElementById('regPassword');
      var confirm = document.getElementById('regConfirm');
      var hasError = false;
      [[name, Validate.name, 'Name must be at least 2 characters'], [email, Validate.email, 'Invalid email format'], [password, Validate.passwordValid, 'Password needs 8+ chars, upper, lower, number & symbol'], [confirm, function(v) { return Validate.match(v, password.value); }, 'Passwords do not match']].forEach(function(rule) {
        var el = rule[0], fn = rule[1], msg = rule[2];
        if (!el) return;
        var valid = fn(el.value);
        el.classList.toggle('valid', valid);
        el.classList.toggle('invalid', !valid);
        var errEl = el.closest('.form-group') ? el.closest('.form-group').querySelector('.form-error') : null;
        if (errEl && !valid) errEl.textContent = msg;
        if (!valid) hasError = true;
      });
      if (hasError) { UI.shake(registerForm); UI.toast('Please fix the errors', 'error'); return; }
      var submitBtn = registerForm.querySelector('button[type="submit"]');
      UI.setLoading(submitBtn, true);
      setTimeout(function() {
        var result = Auth.register(name.value.trim(), email.value.trim(), password.value);
        UI.setLoading(submitBtn, false);
        if (result.success) { UI.toast('Account created! Welcome! 🎉', 'success'); setTimeout(function() { window.location.href = 'onboarding.html'; }, 1000); }
        else { UI.toast(result.error, 'error'); UI.shake(registerForm); }
      }, 800);
    });
  }

  // ===== SETTINGS TOGGLES =====
  document.querySelectorAll('.toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      if (toggle.id === 'darkModeToggle') toggleTheme();
    });
  });

  // ===== SEARCH FUNCTIONALITY =====
  var headerSearch = document.querySelector('.header-search .input');
  if (headerSearch) {
    headerSearch.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var query = headerSearch.value.trim();
        if (!query) { UI.toast('Please enter a search term', 'warning'); return; }
        if (window.location.pathname.includes('objects.html') && window.setObjectSearchQuery) {
          window.setObjectSearchQuery(query);
        } else if (window.location.pathname.includes('deals.html') && window.setDealSearchQuery) {
          window.setDealSearchQuery(query);
        } else {
          var results = Search.items(query);
          if (results.length === 0) { UI.toast('No results found for "' + escapeHtml(query) + '"', 'info'); }
          else { UI.toast(results.length + ' result(s) found', 'success'); }
        }
      }
    });
  }

  // ===== PHOTO UPLOAD =====
  var photoInput = document.getElementById('photoInput');
  var photoGrid = document.getElementById('photoGrid');
  if (photoInput && photoGrid) {
    photoInput.addEventListener('change', function() {
      var count = photoGrid.querySelectorAll('.photo-item').length;
      if (count >= 5) return;
      var file = this.files && this.files[0];
      if (!file) return;
      var fileName = file.name;
      var div = document.createElement('div');
      div.className = 'photo-item';
      div.dataset.fileName = fileName;
      div.innerHTML = '<img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400&h=400" alt="Upload"><button class="remove-btn" type="button" onclick="this.parentElement.remove();updatePhotoCount()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>';
      photoGrid.insertBefore(div, photoGrid.querySelector('.photo-add'));
      updatePhotoCount();
      this.value = '';
    });
  }

  // ===== NOTIFICATION BUTTON =====
  var notifBtn = document.getElementById('notifBtn');
  if (notifBtn) {
    notifBtn.addEventListener('click', function() { window.location.href = 'notifications.html'; });
  }

  // ===== LOGOUT BUTTON =====
  var logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) { logoutBtn.addEventListener('click', function() { Auth.logout(); }); }

  // ===== SETTINGS FORM =====
  var settingsForm = document.getElementById('settingsForm');
  if (settingsForm) {
    var user = Auth.currentUser();
    if (user) {
      var nameInput = document.getElementById('settingsName');
      var emailInput = document.getElementById('settingsEmail');
      var locationInput = document.getElementById('settingsLocation');
      var avatarInput = document.getElementById('settingsAvatar');
      if (nameInput) nameInput.value = user.name || '';
      if (emailInput) emailInput.value = user.email || '';
      if (locationInput) locationInput.value = user.location || '';
      if (avatarInput) avatarInput.value = user.avatar || '';
    }
    settingsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var nameInput = document.getElementById('settingsName');
      var emailInput = document.getElementById('settingsEmail');
      var locationInput = document.getElementById('settingsLocation');
      var avatarInput = document.getElementById('settingsAvatar');
      var onlineToggle = document.getElementById('settingsOnlineToggle');
      if (nameInput && emailInput) {
        Auth.updateUser({ 
          name: nameInput.value.trim(), 
          email: emailInput.value.trim(),
          location: locationInput ? locationInput.value.trim() : '',
          avatar: avatarInput ? avatarInput.value.trim() : '',
          online: onlineToggle ? onlineToggle.classList.contains('active') : false
        });
        UI.updateNav();
        UI.toast('Settings saved! ✓', 'success');
      }
    });
  }

  // ===== PROFILE PAGE DATA =====
  if (currentPage === 'profile.html') {
    var user = Auth.currentUser();
    if (user) {
      var pName = document.querySelector('.profile-name');
      var pBio = document.querySelector('.profile-bio');
      var pAvatar = document.querySelector('.profile-avatar img');
      if (pName) pName.textContent = user.name;
      if (pBio && user.bio) pBio.textContent = user.bio;
      if (pAvatar) pAvatar.src = user.avatar;
    }
  }
});

// Expose globals needed by inline handlers
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.updatePhotoCount = updatePhotoCount;
window.escapeHtml = escapeHtml;
window.SwapifyAuth = Auth;
window.SwapifyUI = UI;
window.SwapifyStore = Store;
window.SwapifyFavorites = Favorites;
window.SwapifyChat = Chat;
window.SwapifyNotifications = Notifications;
window.SwapifySearch = Search;
window.SwapifyValidate = Validate;
window.SwapifyAdmin = Admin;

})();
