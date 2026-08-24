import React, { useState } from 'react';
import { tokens } from '../../pages/LawFirms/LawFirmsData';

// Asset Imports
import uploadIcon from '../../assets/lawfirms/UploadIcon.svg';
import giftIcon from '../../assets/lawfirms/gift.svg';
import heartIcon from '../../assets/lawfirms/heart.svg';
import share2Icon from '../../assets/lawfirms/share2.svg';

const customScrollbar = "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#FF7F4D] [&::-webkit-scrollbar-thumb]:rounded-full";

// ==========================================
// 1. REUSABLE SECTION RENDERERS
// ==========================================

const InfoGrid = ({ columns }) => (
  <div className="grid grid-cols-2 gap-y-6 gap-x-12 font-sans px-4">
    {columns.map((col, cIdx) => (
      <div key={cIdx} className="flex flex-col gap-6">
        {col.map((item, iIdx) => (
          <div key={iIdx}>
            <h3 className="font-bold text-base mb-1 font-sans" style={{ color: tokens.orange }}>
              {item.label} {item.badge && <span className="text-xs font-normal">{item.badge}</span>}
            </h3>
            {Array.isArray(item.value) ? (
              <div className="font-sans leading-tight text-xs pl-3 flex flex-col gap-1" style={{ color: tokens.ink }}>
                {item.value.map((line, lIdx) => (
                  <p key={lIdx}>{line}</p>
                ))}
              </div>
            ) : (
              <p className="font-sans leading-tight text-xs pl-3" style={{ color: tokens.ink }}>{item.value}</p>
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const CredentialsView = ({ items = [] }) => (
  <div className="grid grid-cols-3 gap-6 px-4 font-sans">
    {items.map((cred, idx) => (
      <div key={idx} className="flex flex-col items-center">
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: tokens.orange }}>
          {cred.title}
        </h3>
        <div
          className="w-full h-56 rounded-[8px] flex flex-col items-center justify-center p-4 text-white text-center shadow-md"
          style={{ background: `linear-gradient(135deg, ${tokens.orange} 0%, ${tokens.purple} 100%)` }}
        >
          <img
            src={uploadIcon}
            alt="Upload"
            className="w-20 h-20 mb-2 object-contain filter brightness-0 invert"
          />
          <span className="font-bold text-sm">Upload Here</span>
          <span className="text-[10px] leading-tight text-slate-200 mt-1 max-w-[150px]">
            Maximum 5mb. PDF, PNG, or JPEG file.<br />Recommended Size: 512px x 512px
          </span>
        </div>
        <button
          type="button"
          className="mt-3 text-white text-xs font-semibold py-1.5 px-8 rounded-[5px] shadow hover:opacity-90 transition-opacity cursor-pointer"
          style={{ backgroundColor: tokens.orange }}
        >
          Update
        </button>
      </div>
    ))}
  </div>
);

const ScheduleView = ({ schedule = [] }) => (
  <div className="flex flex-col gap-2 font-sans px-2">
    {schedule.map((row) => (
      <div key={row.day} className="grid grid-cols-12 gap-3 items-center text-xs">
        <div
          className="col-span-3 py-1.5 px-3 text-center rounded-[5px] border font-medium"
          style={{
            backgroundColor: row.active ? tokens.orangeAccent : "#FFFFFF",
            color: row.active ? "#FFFFFF" : tokens.orange,
            borderColor: row.active ? "#000000" : tokens.border,
          }}
        >
          {row.day}
        </div>
        
        <div
          className="col-span-4 flex justify-between items-center text-white px-4 py-1.5 rounded-[4px]"
          style={{ backgroundColor: tokens.orangeAccent }}
        >
          <span className="font-normal text-[11px] text-white">From:</span>
          <span className="font-bold text-black tracking-wide">{row.from}</span>
        </div>

        <div
          className="col-span-5 flex justify-between items-center text-white px-4 py-1.5 rounded-[4px]"
          style={{ backgroundColor: tokens.orangeAccent }}
        >
          <span className="font-normal text-[11px] text-white">To:</span>
          <span className="font-bold text-black tracking-wide">{row.to}</span>
        </div>
      </div>
    ))}
  </div>
);

const AboutMeView = ({ bio, cases = [] }) => (
  <div className="flex flex-col gap-6 font-sans px-4">
    <div>
      <h3 className="font-bold text-base mb-1" style={{ color: tokens.orange }}>Area</h3>
      <p className="text-xs leading-relaxed text-justify pl-3" style={{ color: tokens.textDesc }}>{bio}</p>
    </div>
    <div>
      <h3 className="font-bold text-sm mb-1" style={{ color: tokens.orange }}>
        Case Handled <span className="text-xs font-normal">(at least 2)</span>
      </h3>
      <div className="grid grid-cols-2 text-xs leading-normal pl-3" style={{ color: tokens.ink }}>
        <div>{cases.slice(0, Math.ceil(cases.length / 2)).map((c, i) => <p key={i}>{c}</p>)}</div>
        <div>{cases.slice(Math.ceil(cases.length / 2)).map((c, i) => <p key={i}>{c}</p>)}</div>
      </div>
    </div>
  </div>
);

const RatingsAndFeedbackView = ({ feedbackList = [] }) => {
  return (
    <div className="flex flex-col gap-4 font-sans px-2">
      <div className="mb-2">
        <span
          className="inline-block pb-1 font-bold text-sm font-sans"
          style={{
            color: tokens.purple,
            borderBottom: `2px solid ${tokens.purple}`,
          }}
        >
          Clients Ratings and Feedback
        </span>
      </div>

      <div className={`flex flex-col gap-6 max-h-[360px] overflow-y-auto pr-3 ${customScrollbar}`}>
        {feedbackList.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="w-48 shrink-0 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-slate-700 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm" style={{ color: tokens.orange }}>
                    {item.clientName}
                  </span>
                  <div className="flex text-purple-700 text-sm">
                    {"★".repeat(item.rating)}
                    {"☆".repeat(5 - item.rating)}
                  </div>
                </div>
              </div>
              <div className="text-[11px] leading-tight text-slate-800 font-sans">
                <p className="font-bold">{item.serviceType}</p>
                <p className="text-slate-500">{item.timestamp}</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <div className="bg-[#F6F5F7] rounded-[5px] p-3 text-xs leading-relaxed text-slate-800 relative">
                &ldquo;{item.comment}&rdquo;
              </div>
              <div className="flex justify-end items-center gap-6 px-2">
                <button type="button" className="flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer group">
                  <img src={heartIcon} alt="Praise" className="w-4 h-4 object-contain" />
                  <span className="text-[10px] text-slate-600 group-hover:text-slate-900">Praise</span>
                </button>
                <button type="button" className="flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer group">
                  <img src={giftIcon} alt="Gift" className="w-4 h-4 object-contain" />
                  <span className="text-[10px] text-slate-600 group-hover:text-slate-900">Gift</span>
                </button>
                <button type="button" className="flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer group">
                  <img src={share2Icon} alt="Share" className="w-4 h-4 object-contain" />
                  <span className="text-[10px] text-slate-600 group-hover:text-slate-900">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AccessAndPermissionView = () => {
  const [permissions, setPermissions] = useState({
    creditPage: true,
    accountPage: true,
    ratingsFeedback: true,
    creditsEarned: true,
    lexPointsEarned: true,
  });

  const toggle = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-6 font-sans px-4">
      <div className="mb-2">
        <span
          className="inline-block pb-1 font-bold text-sm font-sans"
          style={{
            color: tokens.purple,
            borderBottom: `2px solid ${tokens.purple}`,
          }}
        >
          Lexmeet
        </span>
      </div>

      <div className="grid grid-cols-2 gap-y-6 gap-x-12">
        {/* Left Column */}
        <div className="flex flex-col gap-4 text-[13px] text-slate-900">
          <h3 className="font-bold text-base mb-1" style={{ color: tokens.orange }}>Access and Permission</h3>
          
          <div className="flex flex-col gap-1.5">
            <span>Law Firm's Credit Page Access</span>
            <button
              type="button"
              onClick={() => toggle('creditPage')}
              className="flex items-center gap-2.5 cursor-pointer text-left select-none"
            >
              <div
                className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                style={{ borderColor: tokens.purple }}
              >
                {permissions.creditPage && (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.purple }} />
                )}
              </div>
              <span>No Access</span>
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <span>Law Firm's Account Page Access</span>
            <button
              type="button"
              onClick={() => toggle('accountPage')}
              className="flex items-center gap-2.5 cursor-pointer text-left select-none"
            >
              <div
                className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                style={{ borderColor: tokens.purple }}
              >
                {permissions.accountPage && (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.purple }} />
                )}
              </div>
              <span>Read Only</span>
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <span>Ratings and Feedback</span>
            <button
              type="button"
              onClick={() => toggle('ratingsFeedback')}
              className="flex items-center gap-2.5 cursor-pointer text-left select-none"
            >
              <div
                className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                style={{ borderColor: tokens.purple }}
              >
                {permissions.ratingsFeedback && (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.purple }} />
                )}
              </div>
              <span>Full Access</span>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 text-[13px] text-slate-900">
          <h3 className="font-bold text-base mb-1" style={{ color: tokens.orange }}>Revenue Sharing</h3>
          
          <div className="flex flex-col gap-1.5">
            <span>Credits Earned</span>
            <button
              type="button"
              onClick={() => toggle('creditsEarned')}
              className="flex items-center gap-2.5 cursor-pointer text-left select-none"
            >
              <div
                className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                style={{ borderColor: tokens.purple }}
              >
                {permissions.creditsEarned && (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.purple }} />
                )}
              </div>
              <span>Sharing - 50% Law Firm and 50% Lawyer</span>
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <span>LexPoints Earned</span>
            <button
              type="button"
              onClick={() => toggle('lexPointsEarned')}
              className="flex items-center gap-2.5 cursor-pointer text-left select-none"
            >
              <div
                className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                style={{ borderColor: tokens.purple }}
              >
                {permissions.lexPointsEarned && (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.purple }} />
                )}
              </div>
              <span>Lawyer Only</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. MAIN MODAL COMPONENT
// ==========================================

export default function LawyerProfileModal({ isOpen, onClose, lawyer }) {
  const [activeMainTab, setActiveMainTab] = useState('access');
  const [activeSubTab, setActiveSubTab] = useState('background');

  if (!isOpen) return null;

  const profile = {
    name: lawyer?.name || 'Eddielyn Joy Bautista',
    role: lawyer?.role || 'Owner',
    position: lawyer?.position || 'Managing Partner',
    status: lawyer?.status || 'Active',
    rollNumber: lawyer?.rollNumber || '4765443',
    rollDate: lawyer?.rollDate || '1996-06-28',
    ibp: lawyer?.ibp || ['23-1234-12345', 'Aklan', '2023-11-10'],
    mcle: lawyer?.mcle || ['I have MCLE Compliance', '32435346546', 'Nov 03, 2023 - Nov 30, 2023'],
    concentration: lawyer?.concentration || ['Administrative Law', 'Alternative Dispute Resolution', 'Appeals/Appellate Litigation'],
    practiceArea: lawyer?.practiceArea || ['Luzon Wide', 'Visayas Wide', 'Mindanao Wide'],
    languages: lawyer?.languages || ['Afrikaans', 'Swedish', 'Tagalog', 'Ukrainian'],
    education: lawyer?.education || ['College', 'Boston University', 'Bachelor of Science in Civil Engineering'],
    experience: lawyer?.experience || ['ABC Corp', '123 Main St', 'New York', 'Software Engineer'],
    schedule: lawyer?.schedule || [
      { day: 'Monday', from: '09:00 AM', to: '05:30 PM', active: true },
      { day: 'Tuesday', from: '09:00 AM', to: '05:30 PM', active: true },
      { day: 'Wednesday', from: '09:00 AM', to: '05:30 PM', active: true },
      { day: 'Thursday', from: '09:00 AM', to: '05:30 PM', active: true },
      { day: 'Friday', from: '09:00 AM', to: '05:30 PM', active: true },
      { day: 'Saturday', from: '--', to: '--', active: false },
      { day: 'Sunday', from: '--', to: '--', active: false },
    ],
    aboutBio: lawyer?.aboutBio || 'Below is a list of cases handled by the attorney, demonstrating their expertise in various areas of law. Please note that at least two cases are required for this section. I am Marlon P. Valderama, a seasoned and passionate attorney dedicated to upholding the principles of justice and advocating for the right of my clients. With a background incorporate letigation, I bring a wealth of experience and a commitment to excellence and legal representations.',
    cases: lawyer?.cases || ['Violation of SEC Laws', 'Cyberlibel', 'Libel and Oral Defamation', 'Libel and Oral Defamation', 'Cyberlibel', 'Violation of SEC Laws'],
    feedbackList: [
      {
        clientName: 'Gwen Stacy',
        rating: 4,
        serviceType: 'Consult',
        timestamp: 'December 23, 2026, 10:00 AM',
        comment: 'Talaga pong kahanga-hanga si Atty. Marlon Valderama sa kanyang mga serbisyo sa kanyang law firm. Patuloy niyang pinapatunayan ang kanyang kahusayan sa paglilingkod sa kanyang mga klyente. Ang kanyang sipag, talino, at propesyonalismo ay nagbibigay ng mataas na antas ng serbisyo, na nagiging inspirasyon sa kanyang mga kasamahan.',
      },
      {
        clientName: 'Gwen Stacy',
        rating: 4,
        serviceType: 'Consult',
        timestamp: 'December 23, 2026, 10:00 AM',
        comment: 'Talaga pong kahanga-hanga si Atty. Marlon Valderama sa kanyang mga serbisyo sa kanyang law firm. Patuloy niyang pinapatunayan ang kanyang kahusayan sa paglilingkod sa kanyang mga klyente. Ang kanyang sipag, talino, at propesyonalismo ay nagbibigay ng mataas na antas ng serbisyo, na nagiging inspirasyon sa kanyang mga kasamahan.',
      },
      {
        clientName: 'Gwen Stacy',
        rating: 4,
        serviceType: 'Consult',
        timestamp: 'December 23, 2026, 10:00 AM',
        comment: 'Talaga pong kahanga-hanga si Atty. Marlon Valderama sa kanyang mga serbisyo sa kanyang law firm. Patuloy niyang pinapatunayan ang kanyang kahusayan sa paglilingkod sa kanyang mga klyente. Ang kanyang sipag, talino, at propesyonalismo ay nagbibigay ng mataas na antas ng serbisyo, na nagiging inspirasyon sa kanyang mga kasamahan.',
      },
    ],
  };

  const subTabRegistry = {
    info: {
      label: 'Lawyer Info',
      component: (
        <InfoGrid
          columns={[
            [
              { label: 'Roll of Attorneys Number', value: profile.rollNumber },
              { label: 'IBP', value: profile.ibp },
              { label: 'Concentration of Law Practice', badge: '(at least 2)', value: profile.concentration },
            ],
            [
              { label: 'Roll of Attorneys Number', value: profile.rollDate },
              { label: 'MCLE', value: profile.mcle },
              { label: 'Area of Law Practice', value: profile.practiceArea },
            ],
          ]}
        />
      ),
    },
    background: {
      label: 'Professional Background',
      component: (
        <InfoGrid
          columns={[
            [
              { label: 'Language and Dialect', badge: '(at least 2)', value: profile.languages },
              { label: 'Education', badge: '(at least 2)', value: profile.education },
            ],
            [
              { label: 'Work Experience', value: profile.experience },
              { label: 'Area of Law Practice', value: profile.practiceArea },
            ],
          ]}
        />
      ),
    },
    credentials: {
      label: 'Credentials',
      component: (
        <CredentialsView
          items={[
            { title: 'IBP Official Receipt' },
            { title: 'PTR Official Receipt' },
            { title: 'MCLE Certificate' },
          ]}
        />
      ),
    },
    schedule: {
      label: 'Schedule',
      component: <ScheduleView schedule={profile.schedule} />,
    },
    about: {
      label: 'About Me',
      component: <AboutMeView bio={profile.aboutBio} cases={profile.cases} />,
    },
  };

  const mainTabs = [
    { id: 'access', label: 'Access and Permission' },
    { id: 'cv', label: 'Curriculum Vitae' },
    { id: 'ratings', label: 'Ratings and Feedback' },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto font-sans">
      <div className="bg-white w-full max-w-[960px] rounded-[10px] shadow-2xl flex flex-col relative overflow-hidden my-6 font-sans">
        
        {/* Top Header */}
        <div className="flex justify-between items-center px-8 pt-8 pb-3">
          <h2 className="font-sans font-bold text-3xl" style={{ color: tokens.ink }}>Lawyer&apos;s Profile:</h2>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-500 hover:text-black text-2xl font-bold cursor-pointer transition-colors"
          >
            &#x2715;
          </button>
        </div>

        {/* Purple Banner */}
        <div
          className="text-white mx-8 mb-6 p-5 flex items-center justify-between relative shadow-sm rounded-[5px]"
          style={{ backgroundColor: tokens.purple }}
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">{profile.name}</span>
              <div className="flex gap-2 mt-1">
                <span className="text-white text-[11px] font-semibold px-4 py-0.5 rounded-[4px]" style={{ backgroundColor: tokens.orange }}>
                  {profile.status}
                </span>
                <button
                  type="button"
                  className="text-white text-[11px] font-semibold px-4 py-0.5 rounded-[4px] hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ backgroundColor: tokens.orangeAccent }}
                >
                  Call Now
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-12 mr-4">
            <div className="text-center">
              <span className="text-xs font-normal opacity-90 block">Role:</span>
              <span className="text-base font-bold">{profile.role}</span>
            </div>
            <div className="text-center">
              <span className="text-xs font-normal opacity-90 block">Position</span>
              <span className="text-base font-bold">{profile.position}</span>
            </div>
          </div>
        </div>

        {/* Primary Tabs (Only Active Tab is Boxed; Inactive Tabs Unboxed) */}
        <div className="flex mx-8 font-sans items-end">
          {mainTabs.map((tab) => {
            const isActive = activeMainTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveMainTab(tab.id)}
                className="flex-1 text-center py-3.5 font-bold text-lg transition-colors cursor-pointer"
                style={{
                  backgroundColor: isActive ? tokens.pageBg : 'transparent',
                  color: tokens.purple,
                  opacity: isActive ? 1 : 0.75,
                  borderTop: isActive ? `2px solid ${tokens.purple}` : 'none',
                  borderLeft: isActive ? `2px solid ${tokens.purple}` : 'none',
                  borderRight: isActive ? `2px solid ${tokens.purple}` : 'none',
                  borderBottom: isActive ? `2px solid ${tokens.pageBg}` : `2px solid ${tokens.purple}`,
                  marginBottom: '-2px',
                  position: 'relative',
                  zIndex: isActive ? 20 : 1,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content Box */}
        <div
          className="border mx-8 mb-6 p-8 min-h-[420px] font-sans relative z-10"
          style={{
            backgroundColor: tokens.pageBg,
            borderColor: tokens.purple,
            borderWidth: '2px',
          }}
        >
          {activeMainTab === 'cv' && (
            <>
              {/* Spread Out Sub Navigation */}
              <div className="flex justify-between items-center max-w-2xl mx-auto mb-8 text-[15px] font-sans" style={{ color: tokens.purple }}>
                {Object.entries(subTabRegistry).map(([key, config]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSubTab(key)}
                    className="pb-1 cursor-pointer transition-colors"
                    style={{
                      borderBottom: activeSubTab === key ? `2.5px solid ${tokens.purple}` : 'none',
                      fontWeight: activeSubTab === key ? 'bold' : 'normal',
                      opacity: activeSubTab === key ? 1 : 0.75,
                    }}
                  >
                    {config.label}
                  </button>
                ))}
              </div>

              <div>{subTabRegistry[activeSubTab]?.component}</div>
            </>
          )}

          {activeMainTab === 'ratings' && (
            <RatingsAndFeedbackView feedbackList={profile.feedbackList} />
          )}

          {activeMainTab === 'access' && (
            <AccessAndPermissionView />
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 px-8 pb-6 font-sans">
          <button
            type="button"
            className="text-white px-8 py-1.5 rounded-[5px] text-xs font-medium hover:opacity-90 cursor-pointer shadow"
            style={{ backgroundColor: tokens.orange }}
          >
            Remove
          </button>
          <button
            type="button"
            className="text-white px-10 py-1.5 rounded-[5px] text-xs font-medium hover:opacity-90 cursor-pointer shadow"
            style={{ backgroundColor: tokens.orangeAccent }}
          >
            Edit
          </button>
        </div>

      </div>
    </div>
  );
}