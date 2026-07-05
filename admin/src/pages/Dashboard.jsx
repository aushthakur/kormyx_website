import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Mail, Briefcase, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState({ leads: [], queries: [], meetings: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('kormyx_admin_token');
        const res = await axios.get('http://localhost:5000/api/admin/dashboard-data', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Sidebar><div className="p-12 text-white/50">Loading metrics...</div></Sidebar>;

  return (
    <Sidebar>
      <div className="p-8 md:p-12">
        <header className="mb-12">
          <h1 className="text-4xl font-light mb-2">Command Center</h1>
          <p className="text-white/50">Real-time overview of incoming leads and queries.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#0A0A0A] p-6 border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-sm">
                <Mail className="w-5 h-5 opacity-80" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/50">General Leads</h3>
            </div>
            <p className="text-4xl font-light">{data.leads.length}</p>
          </div>
          
          <div className="bg-[#0A0A0A] p-6 border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-sm">
                <Briefcase className="w-5 h-5 opacity-80" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/50">Project Queries</h3>
            </div>
            <p className="text-4xl font-light">{data.queries.length}</p>
          </div>

          <div className="bg-[#0A0A0A] p-6 border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-sm">
                <Calendar className="w-5 h-5 opacity-80" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/50">Meetings</h3>
            </div>
            <p className="text-4xl font-light">{data.meetings.length}</p>
          </div>
        </div>

        {/* General Leads Table */}
        <section className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Recent Leads</h2>
          <div className="bg-[#0A0A0A] border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase tracking-widest text-xs">
                <tr>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Service / Details</th>
                </tr>
              </thead>
              <tbody>
                {data.leads.length === 0 && <tr><td colSpan="4" className="p-4 text-center text-white/30">No leads yet.</td></tr>}
                {data.leads.map(lead => (
                  <tr key={lead._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 whitespace-nowrap text-white/70">{new Date(lead.date).toLocaleDateString()}</td>
                    <td className="p-4 font-medium">{lead.name}</td>
                    <td className="p-4 text-white/70">{lead.email}</td>
                    <td className="p-4 text-white/70 max-w-xs truncate">{lead.service} - {lead.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Project Queries Table */}
        <section className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Calculator & Deep Queries</h2>
          <div className="bg-[#0A0A0A] border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase tracking-widest text-xs">
                <tr>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Service Type</th>
                  <th className="p-4 font-medium">Q&A Breakdown</th>
                </tr>
              </thead>
              <tbody>
                {data.queries.length === 0 && <tr><td colSpan="4" className="p-4 text-center text-white/30">No project queries yet.</td></tr>}
                {data.queries.map(q => (
                  <tr key={q._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 whitespace-nowrap text-white/70 align-top">{new Date(q.date).toLocaleDateString()}</td>
                    <td className="p-4 font-medium align-top">{q.contactInfo?.name} <br/><span className="text-white/50 font-normal">{q.contactInfo?.email}</span></td>
                    <td className="p-4 text-white/70 align-top uppercase tracking-widest text-xs">{q.serviceType}</td>
                    <td className="p-4 text-white/70 align-top">
                      <ul className="space-y-2">
                        {q.answers?.map((a, i) => (
                          <li key={i}><strong className="text-white/90">{a.question}:</strong> {a.answer}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Meetings Table */}
        <section className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Upcoming Meetings</h2>
          <div className="bg-[#0A0A0A] border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase tracking-widest text-xs">
                <tr>
                  <th className="p-4 font-medium">Booked On</th>
                  <th className="p-4 font-medium">Meeting Date</th>
                  <th className="p-4 font-medium">Meeting Time</th>
                  <th className="p-4 font-medium">Client Detail</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.meetings.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-white/30">No meetings scheduled yet.</td></tr>}
                {data.meetings.map(m => {
                  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Strategy+Meeting+with+${encodeURIComponent(m.name)}&details=Discovery+call+booked+via+Kormyx&dates=${m.date.replace(/-/g, '')}T${m.time.replace(':', '')}00Z/${m.date.replace(/-/g, '')}T${m.time.replace(':', '')}00Z`;
                  
                  return (
                    <tr key={m._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 whitespace-nowrap text-white/70">{new Date(m.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 font-bold text-white">{m.date}</td>
                      <td className="p-4 text-white/70">{m.time}</td>
                      <td className="p-4 font-medium">
                        {m.name} <br/>
                        <span className="text-white/50 font-normal">{m.email}</span>
                        {m.selectedServices && m.selectedServices.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {m.selectedServices.map((srv, idx) => (
                              <div key={idx} className="text-xs text-white/60 tracking-wider">
                                <span className="uppercase text-white/80">{srv.service}</span>
                                {srv.subService && <span> • {srv.subService}</span>}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <a 
                          href={calendarUrl}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                        >
                          Add to Calendar
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        
      </div>
    </Sidebar>
  );
};

export default Dashboard;
