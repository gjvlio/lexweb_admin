import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { tokens, demoFirm, demoLawyers, demoAssets, demoRatings, websiteContent } from "./LawFirmsData";
import settingsIcon from "../../assets/lawfirms/settings.png";
import LawyerProfileModal from "../../components/lawfirms/LawyerProfileModal";

const fontFamily = "Lato, sans-serif";
const PANEL_HEIGHT = "lg:h-[calc(100dvh-7.5rem)]";
const customScrollbar = "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#FF7F4D] [&::-webkit-scrollbar-thumb]:rounded-full";

function InfoField({ label, value, className = "" }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1 ${className}`}>
      <span className="text-[10px]" style={{ color: tokens.orange }}>{label}</span>
      <span className="truncate text-xs" style={{ color: tokens.textBody }}>{value}</span>
    </div>
  );
}

function FirmInfoCard({ firm }) {
  return (
    <div className="w-full shrink-0 rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex flex-wrap gap-x-8 gap-y-3 p-4">
        <InfoField label="ID:" value={firm.id} className="w-16" />
        <InfoField label="Name:" value={firm.name} className="min-w-[160px] flex-1" />
        <InfoField label="Acronym:" value={firm.acronym} className="w-20" />
      </div>
      <div className="px-4 pb-3">
        <InfoField label="Address:" value={firm.address} />
      </div>
      <hr style={{ borderColor: tokens.purple, borderWidth: "3px" }} />
      <div className="flex flex-wrap gap-x-8 gap-y-3 p-4">
        <InfoField label="Owner/Representative:" value={firm.owner} className="min-w-[160px] flex-1" />
        <InfoField label="Email:" value={firm.email} className="min-w-[140px] flex-1" />
        <InfoField label="Contact #:" value={firm.contact} className="w-32" />
      </div>
    </div>
  );
}

const TABS = ["Lawyers", "Assets", "Ratings"];

function TabBar({ active, onChange }) {
  return (
    <div className="flex w-full max-w-xs shrink-0 overflow-hidden rounded-[5px] border shadow-[0_4px_4px_rgba(0,0,0,0.25)]" style={{ borderColor: "#898989" }}>
      {TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className="flex-1 border-r py-2 text-sm font-bold last:border-r-0 cursor-pointer"
            style={{
              backgroundColor: isActive ? tokens.purple : "#FFFFFF",
              color: isActive ? tokens.pageBg : "#898989",
              borderColor: "#898989",
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

function ViewButton({ onClick, label = "VIEW" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-[5px] bg-[#F4512C] px-3 py-1 text-[10px] uppercase font-normal leading-[14px] text-white transition-opacity hover:opacity-90 active:opacity-80 cursor-pointer"
    >
      {label}
    </button>
  );
}

function LawyersTable({ lawyers, query, onQueryChange, onRowClick, onSearchSettings }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lawyers;
    return lawyers.filter((l) =>
      [l.id, l.name, l.role, l.email, l.contact].join(" ").toLowerCase().includes(q)
    );
  }, [lawyers, query]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-[5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]" style={{ backgroundColor: tokens.purple }}>
      <div className="p-4 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSearchSettings}
            className="flex shrink-0 items-center justify-center rounded-[5px] bg-[#F8FFFE] p-2 transition-opacity hover:opacity-80 active:opacity-60 cursor-pointer"
            style={{ borderColor: tokens.purple }}
            title="Search Settings"
          >
            <img src={settingsIcon} alt="Settings" className="h-4 w-4 object-contain" />
          </button>
          <div className="flex flex-1 max-w-xs items-center gap-2 rounded-[5px] border bg-[#F8FFFE] px-3 py-1.5" style={{ borderColor: tokens.purple }}>
            <Search size={14} style={{ color: tokens.orange }} />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search Lawyers"
              className="w-full border-none bg-transparent text-xs outline-none placeholder:text-[#8C8088]"
              style={{ fontFamily: "Gotham, sans-serif" }}
            />
          </div>
        </div>
      </div>

      <div className="mx-4 mb-4 flex-1 overflow-hidden rounded-[5px] bg-white">
        <div className={`h-full overflow-auto ${customScrollbar}`}>
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b" style={{ borderColor: tokens.border }}>
                {["#", "ID", "Name", "Role", "Email", "Contact #", "Action"].map((h) => (
                  <th key={h} className="px-3 py-3 text-xs font-bold whitespace-nowrap" style={{ color: tokens.textBody }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lawyer, i) => (
                <tr
                  key={lawyer.id}
                  className="border-b last:border-b-0 hover:bg-slate-50 transition-colors"
                  style={{ borderColor: tokens.border }}
                >
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{i + 1}</td>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{lawyer.id}</td>
                  <td className="px-3 py-3 text-xs font-medium" style={{ color: tokens.textBody }}>{lawyer.name}</td>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{lawyer.role}</td>
                  <td className="px-3 py-3 text-xs underline" style={{ color: tokens.textBody }}>{lawyer.email}</td>
                  <td className="px-3 py-3 text-xs whitespace-nowrap" style={{ color: tokens.textBody }}>{lawyer.contact}</td>
                  <td className="px-3 py-3">
                    <ViewButton onClick={() => onRowClick?.(lawyer)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AssetsTable({ assets, query, onQueryChange, onViewAsset, onSearchSettings }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return assets;
    return assets.filter((a) =>
      [a.id, a.category, a.altText].join(" ").toLowerCase().includes(q)
    );
  }, [assets, query]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-[5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]" style={{ backgroundColor: tokens.purple }}>
      <div className="p-4 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSearchSettings}
            className="flex shrink-0 items-center justify-center rounded-[5px] bg-[#F8FFFE] p-2 transition-opacity hover:opacity-80 active:opacity-60 cursor-pointer"
            style={{ borderColor: tokens.purple }}
            title="Search Settings"
          >
            <img src={settingsIcon} alt="Settings" className="h-4 w-4 object-contain" />
          </button>
          <div className="flex flex-1 max-w-xs items-center gap-2 rounded-[5px] border bg-[#F8FFFE] px-3 py-1.5" style={{ borderColor: tokens.purple }}>
            <Search size={14} style={{ color: tokens.orange }} />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search Assets"
              className="w-full border-none bg-transparent text-xs outline-none placeholder:text-[#8C8088]"
              style={{ fontFamily: "Gotham, sans-serif" }}
            />
          </div>
        </div>
      </div>

      <div className="mx-4 mb-4 flex-1 overflow-hidden rounded-[5px] bg-white">
        <div className={`h-full overflow-auto ${customScrollbar}`}>
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b" style={{ borderColor: tokens.border }}>
                <th className="px-3 py-3 text-xs font-bold" style={{ color: tokens.textBody }}>#</th>
                <th className="px-3 py-3 text-xs font-bold" style={{ color: tokens.textBody }}>ID</th>
                <th className="px-3 py-3 text-xs font-bold" style={{ color: tokens.textBody }}>Category</th>
                <th className="px-3 py-3 text-xs font-bold" style={{ color: tokens.textBody }}>Alt Text</th>
                <th className="px-3 py-3 text-xs font-bold" style={{ color: tokens.textBody }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item.id} className="border-b last:border-b-0" style={{ borderColor: tokens.border }}>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{i + 1}</td>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{item.id}</td>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{item.category}</td>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{item.altText}</td>
                  <td className="px-3 py-3">
                    <ViewButton onClick={() => onViewAsset?.(item)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RatingsTable({ ratings, query, onQueryChange, onSearchSettings }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ratings;
    return ratings.filter((r) =>
      [r.id, r.raterName, r.rate, r.comment, r.date].join(" ").toLowerCase().includes(q)
    );
  }, [ratings, query]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-[5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]" style={{ backgroundColor: tokens.purple }}>
      <div className="p-4 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSearchSettings}
            className="flex shrink-0 items-center justify-center rounded-[5px] bg-[#F8FFFE] p-2 transition-opacity hover:opacity-80 active:opacity-60 cursor-pointer"
            style={{ borderColor: tokens.purple }}
            title="Search Settings"
          >
            <img src={settingsIcon} alt="Settings" className="h-4 w-4 object-contain" />
          </button>
          <div className="flex flex-1 max-w-xs items-center gap-2 rounded-[5px] border bg-[#F8FFFE] px-3 py-1.5" style={{ borderColor: tokens.purple }}>
            <Search size={14} style={{ color: tokens.orange }} />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search Ratings"
              className="w-full border-none bg-transparent text-xs outline-none placeholder:text-[#8C8088]"
              style={{ fontFamily: "Gotham, sans-serif" }}
            />
          </div>
        </div>
      </div>

      <div className="mx-4 mb-4 flex-1 overflow-hidden rounded-[5px] bg-white">
        <div className={`h-full overflow-auto ${customScrollbar}`}>
          <table className="w-full min-w-[500px] border-collapse text-left">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b" style={{ borderColor: tokens.border }}>
                <th className="px-3 py-3 text-xs font-bold" style={{ color: tokens.textBody }}>#</th>
                <th className="px-3 py-3 text-xs font-bold" style={{ color: tokens.textBody }}>ID</th>
                <th className="px-3 py-3 text-xs font-bold" style={{ color: tokens.textBody }}>Rater Name</th>
                <th className="px-3 py-3 text-xs font-bold" style={{ color: tokens.textBody }}>Rate</th>
                <th className="px-3 py-3 text-xs font-bold" style={{ color: tokens.textBody }}>Comment</th>
                <th className="px-3 py-3 text-xs font-bold" style={{ color: tokens.textBody }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item.id} className="border-b last:border-b-0" style={{ borderColor: tokens.border }}>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{i + 1}</td>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{item.id}</td>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{item.raterName}</td>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{item.rate}</td>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{item.comment}</td>
                  <td className="px-3 py-3 text-xs whitespace-nowrap" style={{ color: tokens.textBody }}>{item.date}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-xs" style={{ color: tokens.textDesc }}>
                    No ratings match "{query}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LawFirmDetailColumn({ className = "", onSelectLawyer }) {
  const [activeTab, setActiveTab] = useState("Lawyers");
  const [query, setQuery] = useState("");

  const handleSearchSettings = (tabName) => {
    console.log(`Search settings clicked for ${tabName}`);
  };

  return (
    <div className={`flex w-full flex-col gap-4 ${className}`}>
      <FirmInfoCard firm={demoFirm} />
      <TabBar active={activeTab} onChange={(t) => { setActiveTab(t); setQuery(""); }} />

      {activeTab === "Lawyers" && (
        <LawyersTable
          lawyers={demoLawyers}
          query={query}
          onQueryChange={setQuery}
          onRowClick={onSelectLawyer}
          onSearchSettings={() => handleSearchSettings("Lawyers")}
        />
      )}
      {activeTab === "Assets" && (
        <AssetsTable
          assets={demoAssets}
          query={query}
          onQueryChange={setQuery}
          onViewAsset={(asset) => console.log("view asset", asset)}
          onSearchSettings={() => handleSearchSettings("Assets")}
        />
      )}
      {activeTab === "Ratings" && (
        <RatingsTable
          ratings={demoRatings}
          query={query}
          onQueryChange={setQuery}
          onSearchSettings={() => handleSearchSettings("Ratings")}
        />
      )}
    </div>
  );
}

function ActionButtons({ onView, onEdit, onDelete }) {
  const base =
    "rounded-[5px] px-3 py-1 text-[11px] font-normal leading-[14px] text-white transition-opacity hover:opacity-90 active:opacity-80 cursor-pointer";
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <button type="button" onClick={onView} className={base} style={{ backgroundColor: tokens.purpleSoft }}>
        View
      </button>
      <button type="button" onClick={onEdit} className={base} style={{ backgroundColor: tokens.purpleSoft }}>
        Edit
      </button>
      <button type="button" onClick={onDelete} className={base} style={{ backgroundColor: tokens.orange }}>
        Delete
      </button>
    </div>
  );
}

function SectionHeading({ title, actions }) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2">
      <h3 className="text-base font-normal sm:text-lg" style={{ color: tokens.purple, fontFamily }}>
        {title}
      </h3>
      {actions}
    </div>
  );
}

function ContentCard({ children, className = "" }) {
  return (
    <div
      className={`w-full rounded-[5px] border p-3 sm:p-4 ${className}`}
      style={{ backgroundColor: tokens.headerBg, borderColor: tokens.borderStrong }}
    >
      <p className="text-xs leading-[14px] sm:text-[13px]" style={{ color: tokens.textDesc }}>
        {children}
      </p>
    </div>
  );
}

function TableSection({ title, columns, rows, renderCell, maxHeight = "max-h-36", actions }) {
  return (
    <section className="flex w-full flex-col gap-2">
      {title && (
        <SectionHeading title={title} actions={actions} />
      )}

      <div className="w-full overflow-hidden rounded-[5px] border bg-white" style={{ borderColor: tokens.borderStrong, fontFamily }}>
        <div className="flex w-full items-center gap-3 px-4 py-2" style={{ backgroundColor: tokens.headerBg }}>
          {columns.map((col) => (
            <span
              key={col.key}
              className={`text-[11px] font-bold sm:text-xs ${col.width ?? "flex-1"} ${col.align === "right" ? "text-right" : "text-left"}`}
              style={{ color: tokens.textBody }}
            >
              {col.label}
            </span>
          ))}
        </div>

        <div className={`${maxHeight} divide-y overflow-y-auto ${customScrollbar}`} style={{ borderColor: tokens.border }}>
          {rows.map((row) => (
            <div key={row.id} className="flex w-full items-center gap-3 px-4 py-2.5" style={{ borderColor: tokens.border }}>
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={`text-[11px] sm:text-xs ${col.width ?? "flex-1"} ${col.align === "right" ? "flex justify-end" : ""}`}
                  style={{ color: col.muted ? tokens.textDesc : tokens.textBody }}
                >
                  {renderCell ? renderCell(row, col) : row[col.key]}
                </div>
              ))}
            </div>
          ))}
          {rows.length === 0 && (
            <div className="px-4 py-4 text-center text-[11px]" style={{ color: tokens.textDesc }}>
              Nothing here yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function LawFirmDetailsPanel({ onLiveView, onEditSection, onDeleteSection, onViewPracticeArea }) {
  const noop = () => {};

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]" style={{ fontFamily }}>
      <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4" style={{ backgroundColor: tokens.purple }}>
        <h2 className="text-xl font-normal text-[#F8FFFE] sm:text-2xl">Law Firm Website</h2>
        <button
          type="button"
          onClick={onLiveView ?? noop}
          className="shrink-0 rounded-[5px] bg-[#F4512C] px-3 py-1.5 text-[10px] font-normal tracking-wide text-[#F8FFFE] transition-opacity hover:opacity-90 cursor-pointer"
        >
          LIVE VIEW
        </button>
      </div>

      <div className={`flex flex-1 flex-col gap-6 overflow-y-auto p-4 sm:gap-8 sm:p-6 ${customScrollbar}`}>
        <section className="flex flex-col gap-2">
          <SectionHeading
            title="About Us"
            actions={<ActionButtons onView={() => onEditSection?.("about", "view")} onEdit={() => onEditSection?.("about", "edit")} onDelete={() => onDeleteSection?.("about")} />}
          />
          <ContentCard>{websiteContent.aboutUs}</ContentCard>
        </section>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
          <section className="flex flex-1 flex-col gap-2">
            <SectionHeading
              title="Mission"
              actions={<ActionButtons onView={() => onEditSection?.("mission", "view")} onEdit={() => onEditSection?.("mission", "edit")} onDelete={() => onDeleteSection?.("mission")} />}
            />
            <ContentCard className="h-full">{websiteContent.mission}</ContentCard>
          </section>

          <section className="flex flex-1 flex-col gap-2">
            <SectionHeading
              title="Vision"
              actions={<ActionButtons onView={() => onEditSection?.("vision", "view")} onEdit={() => onEditSection?.("vision", "edit")} onDelete={() => onDeleteSection?.("vision")} />}
            />
            <ContentCard className="h-full">{websiteContent.vision}</ContentCard>
          </section>
        </div>

        <TableSection
          title="Values We Live By"
          actions={<ActionButtons onView={() => onEditSection?.("values", "view")} onEdit={() => onEditSection?.("values", "edit")} onDelete={() => onDeleteSection?.("values")} />}
          maxHeight="max-h-56"
          columns={[
            { key: "id", label: "#", width: "w-8 flex-none" },
            { key: "name", label: "Title", width: "w-1/4" },
            { key: "description", label: "Description", width: "flex-1", muted: true },
            { key: "action", label: "Icon/Image", width: "w-20 flex-none", align: "right" },
          ]}
          rows={websiteContent.values}
          renderCell={(row, col) => (col.key === "action" ? <ViewButton onClick={() => onViewPracticeArea?.(row)} /> : row[col.key])}
        />

        <section className="flex flex-col gap-2">
          <SectionHeading
            title="Our Promise"
            actions={<ActionButtons onView={() => onEditSection?.("promise", "view")} onEdit={() => onEditSection?.("promise", "edit")} onDelete={() => onDeleteSection?.("promise")} />}
          />
          <ContentCard>{websiteContent.promise}</ContentCard>
        </section>

        <hr style={{ borderColor: tokens.borderStrong }} />

        <TableSection
          title="Practice Area"
          actions={<ActionButtons onView={() => onEditSection?.("practiceArea", "view")} onEdit={() => onEditSection?.("practiceArea", "edit")} onDelete={() => onDeleteSection?.("practiceArea")} />}
          columns={[
            { key: "id", label: "#", width: "w-8 flex-none" },
            { key: "name", label: "Name", width: "w-1/4" },
            { key: "description", label: "Description", width: "flex-1", muted: true },
            { key: "action", label: "Icon/Image", width: "w-20 flex-none", align: "right" },
          ]}
          rows={websiteContent.practiceAreas}
          renderCell={(row, col) => (col.key === "action" ? <ViewButton onClick={() => onViewPracticeArea?.(row)} /> : row[col.key])}
        />

        <TableSection
          title="Cases Handled"
          actions={<ActionButtons onView={() => onEditSection?.("cases", "view")} onEdit={() => onEditSection?.("cases", "edit")} onDelete={() => onDeleteSection?.("cases")} />}
          columns={[
            { key: "id", label: "#", width: "w-8 flex-none" },
            { key: "case", label: "Case", width: "flex-1" },
          ]}
          rows={websiteContent.cases}
        />

        <TableSection
          title="Location of Practice"
          actions={<ActionButtons onView={() => onEditSection?.("locations", "view")} onEdit={() => onEditSection?.("locations", "edit")} onDelete={() => onDeleteSection?.("locations")} />}
          columns={[
            { key: "id", label: "#", width: "w-8 flex-none" },
            { key: "location", label: "Location", width: "flex-1" },
          ]}
          rows={websiteContent.locations}
        />

        <TableSection
          title="Awards and Citations"
          actions={<ActionButtons onView={() => onEditSection?.("awards", "view")} onEdit={() => onEditSection?.("awards", "edit")} onDelete={() => onDeleteSection?.("awards")} />}
          columns={[
            { key: "id", label: "#", width: "w-8 flex-none" },
            { key: "category", label: "Category", width: "w-1/4" },
            { key: "title", label: "Title", width: "flex-1", muted: true },
            { key: "year", label: "Year", width: "w-14 flex-none", align: "right" },
          ]}
          rows={websiteContent.awards}
        />
      </div>
    </div>
  );
}

export default function LawFirmsPage() {
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenLawyerModal = (lawyer) => {
    setSelectedLawyer(lawyer);
    setIsModalOpen(true);
  };

  return (
    <div className={`min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 ${customScrollbar}`} style={{ backgroundColor: tokens.pageBg }}>
      {/* Breadcrumbs matching Subscriptions.jsx */}
      <div className="mb-4 flex flex-col gap-1.5">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans">
          <Link to="/lawfirms" className="text-brand-orange hover:underline">
            Lawfirms
          </Link>
          <span className="text-slate-400">&rsaquo;</span>
          <Link to="" className="text-brand-purple hover:underline">
            Bautista Lawfirm Office
          </Link>
        </nav>

        <h1
          className="text-2xl font-normal sm:text-[32px] sm:leading-[42px]"
          style={{ color: tokens.purple, fontFamily: "'Roboto Slab', serif" }}
        >
          Bautista Law Firm Office
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
        <LawFirmDetailColumn 
          className={`h-[600px] ${PANEL_HEIGHT}`} 
          onSelectLawyer={handleOpenLawyerModal}
        />

        <div className={`h-[600px] w-full lg:sticky lg:top-6 ${PANEL_HEIGHT}`}>
          <LawFirmDetailsPanel onLiveView={() => console.log("live view")} />
        </div>
      </div>

      {/* Interactive Modal */}
      <LawyerProfileModal
        isOpen={isModalOpen}
        lawyer={selectedLawyer}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}