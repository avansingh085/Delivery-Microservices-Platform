import React, { useState, useEffect } from 'react';
import {
  User, Mail, Phone, MapPin, Camera,
  Settings, Bell, Shield, LogOut,
  ChevronRight, Edit2, Globe
} from 'lucide-react';
import { updateProfile } from '../api/userApi';
import AddItems from '../components/AddItems';

const ProfilePage = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({ 
    firstName: '', 
    lastName: '', 
    phone: '', 
    email: '', 
    location: '', 
    bio: '', 
    avatar: '' 
  });

  useEffect(() => {
    if (profile) setUser(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "fullName") {
      const [first, ...rest] = value.split(" ");
      setUser(prev => ({
        ...prev,
        firstName: first || '',
        lastName: rest.join(" ") || ''
      }));
    } else {
      setUser(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateToggle = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const { message, success } = await updateProfile(user);
      if (success) {
        setIsEditing(false);
      
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
     
      <div className="absolute top-0 left-0 w-full h-80 overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[100%] bg-indigo-100 rounded-full blur-[120px]" />
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[100%] bg-blue-100 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-10">
      
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10 bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-white shadow-lg">
              <img src={user.avatar || 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg'} alt="Profile" className="w-full h-full object-cover bg-indigo-50" />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform" >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold tracking-tight">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-slate-500 font-medium">{user?.bio || "No bio set"}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <span className="flex items-center gap-1.5 text-sm bg-white/80 px-3 py-1.5 rounded-full border border-slate-100 text-slate-600">
                <MapPin className="w-4 h-4 text-indigo-500" /> {user?.location || "Unknown"}
              </span>
              <span className="flex items-center gap-1.5 text-sm bg-white/80 px-3 py-1.5 rounded-full border border-slate-100 text-slate-600">
                <Globe className="w-4 h-4 text-indigo-500" /> English, Spanish
              </span>
            </div>
          </div>

          <button
            onClick={handleUpdateToggle}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
              isEditing ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            <Edit2 className="w-4 h-4" /> {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
           
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-500" /> Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", name: "fullName", value: `${user.firstName} ${user.lastName}`, icon: User },
                  { label: "Email Address", name: "email", value: user.email, icon: Mail },
                  { label: "Phone Number", name: "phone", value: user.phone, icon: Phone },
                  { label: "Location", name: "location", value: user.location, icon: MapPin },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{item.label}</label>
                    <div className="relative group">
                      <input
                        disabled={!isEditing||item.name==="email"}
                        type="text"
                        name={item.name}
                        value={item.value || ''}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 pl-11 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all disabled:opacity-70"
                      />
                      <item.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Orders", value: "24" },
                { label: "Points", value: "1,250" },
                { label: "Reviews", value: "12" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] text-center border border-slate-100 shadow-sm">
                  <p className="text-2xl font-black mb-1">{stat.value}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          

          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold mb-4 px-2">Account Settings</h3>
              <nav className="space-y-1">
                {[
                  { icon: Bell, label: "Notifications", color: "text-blue-500" },
                  { icon: Shield, label: "Security", color: "text-indigo-500" },
                  { icon: Settings, label: "Preferences", color: "text-slate-500" },
                ].map((link, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-white transition-colors">
                        <link.icon className={`w-5 h-5 ${link.color}`} />
                      </div>
                      <span className="font-semibold text-slate-700">{link.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
                <div className="h-px bg-slate-100 my-4 mx-2" />
                <button className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-colors font-semibold">
                  <div className="p-2 rounded-xl bg-red-50">
                    <LogOut className="w-5 h-5" />
                  </div>
                  Sign Out
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <AddItems/>
    </div>
  );
};

export default ProfilePage;