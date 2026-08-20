import { useMemo, useState } from "react";
import { Search, ChevronRight, Settings2 } from "lucide-react";

/**
 * Design tokens pulled directly from the Figma export.
 * Kept in one place so every section (cards, table, website panel)
 * stays visually consistent.
 */
const tokens = {
  purple: "#5E1B89",
  purpleSoft: "#9D71BC",
  orange: "#F4512C",
  headerBg: "#F5F5F5",
  border: "#BABABA",
  borderStrong: "#A6A5A5",
  textBody: "#5C5359",
  textDesc: "#464646",
  ink: "#201E1D",
  muted: "#7D7979",
  pageBg: "#F8FFFE",
};

const fontFamily = "Lato, sans-serif";

/* ------------------------------------------------------------------ */
/* Breadcrumb + page title                                             */
/* ------------------------------------------------------------------ */

function Breadcrumb({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-1 text-[10px]" style={{ color: tokens.orange, fontFamily: "Gotham, sans-serif" }}>
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={10} />}
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lawyer / firm info card                                             */
/* ------------------------------------------------------------------ */

function InfoField({ label, value, className = "" }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1 ${className}`}>
      <span className="text-[10px]" style={{ color: tokens.orange }}>
        {label}
      </span>
      <span className="truncate text-xs" style={{ color: tokens.textBody }}>
        {value}
      </span>
    </div>
  );
}

function FirmInfoCard({ firm }) {
  return (
    <div className="w-full rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
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

/* ------------------------------------------------------------------ */
/* Tabs + lawyer table                                                 */
/* ------------------------------------------------------------------ */

const TABS = ["Lawyers", "Assets", "Ratings"];

function TabBar({ active, onChange }) {
  return (
    <div className="flex w-full max-w-xs overflow-hidden rounded-[5px] border shadow-[0_4px_4px_rgba(0,0,0,0.25)]" style={{ borderColor: "#898989" }}>
      {TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className="flex-1 border-r py-2 text-sm font-bold last:border-r-0"
            style={{
              backgroundColor: isActive ? tokens.purple : "#FFFFFF",
              color: isActive ? tokens.pageBg : "#898989",
              borderColor: "#898989",
              fontWeight: isActive ? 700 : 400,
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

function LawyerRowActions({ onSettings }) {
  return (
    <button
      type="button"
      onClick={onSettings}
      className="rounded p-1.5 hover:bg-black/5"
      style={{ color: tokens.orange }}
      aria-label="Row settings"
    >
      <Settings2 size={16} />
    </button>
  );
}

function LawyersTable({ lawyers, query, onQueryChange, onRowSettings }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lawyers;
    return lawyers.filter((l) =>
      [l.id, l.name, l.role, l.email, l.contact].join(" ").toLowerCase().includes(q)
    );
  }, [lawyers, query]);

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]" style={{ backgroundColor: tokens.purple }}>
      {/* Search bar */}
      <div className="p-4 pb-3">
        <div className="flex max-w-xs items-center gap-2 rounded-[5px] border bg-white px-3 py-2" style={{ borderColor: tokens.purple }}>
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

      {/* Table card */}
      <div className="mx-4 mb-4 flex-1 overflow-hidden rounded-[5px] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b" style={{ borderColor: tokens.border }}>
                {["#", "ID", "Name", "Role", "Email", "Contact #", "Action"].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-3 text-xs font-bold whitespace-nowrap"
                    style={{ color: tokens.textBody }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lawyer, i) => (
                <tr
                  key={lawyer.id}
                  className="border-b last:border-b-0"
                  style={{ borderColor: tokens.border }}
                >
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{i + 1}</td>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{lawyer.id}</td>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{lawyer.name}</td>
                  <td className="px-3 py-3 text-xs" style={{ color: tokens.textBody }}>{lawyer.role}</td>
                  <td className="px-3 py-3 text-xs underline" style={{ color: tokens.textBody }}>{lawyer.email}</td>
                  <td className="px-3 py-3 text-xs whitespace-nowrap" style={{ color: tokens.textBody }}>{lawyer.contact}</td>
                  <td className="px-3 py-3">
                    <LawyerRowActions onSettings={() => onRowSettings?.(lawyer)} />
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-xs" style={{ color: tokens.textDesc }}>
                    No lawyers match "{query}".
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

/* ------------------------------------------------------------------ */
/* Assets / Ratings placeholder panels for the other two tabs          */
/* ------------------------------------------------------------------ */

function EmptyTabPanel({ label }) {
  return (
    <div
      className="flex w-full flex-1 items-center justify-center rounded-[5px] p-10 text-center text-sm text-white/80 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      style={{ backgroundColor: tokens.purple, minHeight: 200 }}
    >
      {label} will show up here.
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Left column: everything about the firm + its lawyers                */
/* ------------------------------------------------------------------ */

const demoFirm = {
  id: "123",
  name: "Bautista Lawfirm Office",
  acronym: "BLO",
  address: "123 Street 456 Baranggay 789 City, Philippines",
  owner: "Eddielyn Joy Bautista",
  email: "sampleemail@gmail.com",
  contact: "09501055888",
};

const demoLawyers = [
  { id: "123", name: "Eddielyn Joy Bautista", role: "Owner", email: "ejsample@gmail.com", contact: "09507833641" },
  { id: "45", name: "Joy Bautista", role: "Partner", email: "ejsample@gmail.com", contact: "09507833641" },
  { id: "46", name: "Marco Reyes", role: "Associate", email: "mreyes@gmail.com", contact: "09171234567" },
  { id: "47", name: "Liza Fernandez", role: "Associate", email: "lfernandez@gmail.com", contact: "09189876543" },
];

function LawFirmDetailColumn() {
  const [activeTab, setActiveTab] = useState("Lawyers");
  const [query, setQuery] = useState("");

  return (
    <div className="flex w-full flex-col gap-4 lg:max-w-xl">
      <div className="flex flex-col gap-1">
        <Breadcrumb items={["Lawfirms", "Bautista Lawfirm Office"]} />
        <h1
          className="text-2xl font-normal sm:text-[32px] sm:leading-[42px]"
          style={{ color: tokens.purple, fontFamily: "'Roboto Slab', serif" }}
        >
          Bautista Law Firm Office
        </h1>
      </div>

      <FirmInfoCard firm={demoFirm} />

      <TabBar active={activeTab} onChange={setActiveTab} />

      {activeTab === "Lawyers" && (
        <LawyersTable
          lawyers={demoLawyers}
          query={query}
          onQueryChange={setQuery}
          onRowSettings={(lawyer) => console.log("settings for", lawyer)}
        />
      )}
      {activeTab === "Assets" && <EmptyTabPanel label="Assets" />}
      {activeTab === "Ratings" && <EmptyTabPanel label="Ratings" />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Right column: the law firm website panel (from your existing build) */
/* ------------------------------------------------------------------ */

function ViewButton({ onClick, label = "View" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-[5px] bg-[#F4512C] px-3 py-1 text-[11px] font-normal leading-[14px] text-white transition-opacity hover:opacity-90 active:opacity-80"
    >
      {label}
    </button>
  );
}

function ActionButtons({ onView, onEdit, onDelete }) {
  const base =
    "rounded-[5px] px-3 py-1 text-[11px] font-normal leading-[14px] text-white transition-opacity hover:opacity-90 active:opacity-80";
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

function TableSection({ title, columns, rows, renderCell, maxHeight = "max-h-36" }) {
  return (
    <section className="flex w-full flex-col gap-2">
      <h3 className="text-sm font-semibold sm:text-base" style={{ color: tokens.purple, fontFamily }}>
        {title}
      </h3>

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

        <div className={`${maxHeight} divide-y overflow-y-auto`} style={{ borderColor: tokens.border }}>
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

const aboutUsCopy =
  'LexMeet is a legal tech company and its name was derived from two words "Lex" and "Meet". "Lex" in Latin means law or related to legal matters while "Meet" is a verb which means to see and speak to (someone) for the first time: to be introduced to or become acquainted with (someone); to come together in order to talk; to go to a place to be with someone else; to come together formally; to have a meeting; to come together for a discussion.';

const missionCopy =
  "Our mission is to bridge the gap between clients and lawyers by giving them the facility and technology to meet and solve their problems. We want to make legal services more";

const visionCopy =
  "Our vision is to see people seeking legal services without leaving the comforts of their home through technology. Our aim is to make legal";

const ourPromiseCopy =
  "With this philosophy, LexMeet was born. That is why we are urging lawyers and clients to LexMeet! Legal advice just a click away!";

const valuesData = [
  { id: 1, name: "We Innovate Legal Solutions", description: "We are always looking for other ways to make legal services convenient, affordable and secure for all stakeholders..." },
  { id: 2, name: "We Seek Justice Together", description: "Although we are a legal tech company, we are not robots. We empathize with people seeking justice, deprived of legal..." },
  { id: 3, name: "We Provide Dignified Services", description: "Property Disputes, We put premium to integrity and dignity. We believe that in any endeavor, most especially in legal services..." },
];

const practiceAreaData = [
  { id: 1, name: "Personal & Family Law", description: "Marriage & Annulment, Child custody, Estate Planning" },
  { id: 2, name: "Labor Law", description: "Employment Contracts, Workplace Disputes, Wrongful Termination" },
  { id: 3, name: "Civil Law", description: "Property Disputes, Contract Disputes, Personal Injury" },
];

const casesHandledData = [
  { id: 1, case: "Abatement of Nuisance" },
  { id: 2, case: "Sample" },
  { id: 3, case: "Sample here too" },
];

const locationData = [
  { id: 1, location: "Nationwide" },
  { id: 2, location: "Luzon Wide" },
  { id: 3, location: "Visayas Wide" },
];

const awardsData = [
  { id: 1, category: "Special Awards", title: "Best Law Firm in 2020 Women's Rights Cases Category", year: "2020" },
  { id: 2, category: "Citations", title: "University of Santo Tomas, Certificate of Recognition for Best Internship Law Firm", year: "2021" },
];

function LawFirmDetailsPanel({ onLiveView, onEditSection, onDeleteSection, onViewPracticeArea }) {
  const [practiceAreas] = useState(practiceAreaData);
  const [cases] = useState(casesHandledData);
  const [locations] = useState(locationData);
  const [awards] = useState(awardsData);
  const [values] = useState(valuesData);
  const noop = () => {};

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]" style={{ fontFamily }}>
      <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4" style={{ backgroundColor: tokens.purple }}>
        <h2 className="text-xl font-normal text-[#F8FFFE] sm:text-2xl">Law Firm Website</h2>
        <button
          type="button"
          onClick={onLiveView ?? noop}
          className="shrink-0 rounded-[5px] bg-[#F4512C] px-3 py-1.5 text-[10px] font-normal tracking-wide text-[#F8FFFE] transition-opacity hover:opacity-90"
        >
          LIVE VIEW
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 sm:gap-8 sm:p-6">
        <section className="flex flex-col gap-2">
          <SectionHeading
            title="About Us"
            actions={<ActionButtons onView={() => onEditSection?.("about", "view")} onEdit={() => onEditSection?.("about", "edit")} onDelete={() => onDeleteSection?.("about")} />}
          />
          <ContentCard>{aboutUsCopy}</ContentCard>
        </section>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
          <section className="flex flex-1 flex-col gap-2">
            <SectionHeading
              title="Mission"
              actions={<ActionButtons onView={() => onEditSection?.("mission", "view")} onEdit={() => onEditSection?.("mission", "edit")} onDelete={() => onDeleteSection?.("mission")} />}
            />
            <ContentCard className="h-full">{missionCopy}</ContentCard>
          </section>

          <section className="flex flex-1 flex-col gap-2">
            <SectionHeading
              title="Vision"
              actions={<ActionButtons onView={() => onEditSection?.("vision", "view")} onEdit={() => onEditSection?.("vision", "edit")} onDelete={() => onDeleteSection?.("vision")} />}
            />
            <ContentCard className="h-full">{visionCopy}</ContentCard>
          </section>
        </div>

        <section className="flex flex-col gap-2">
          <SectionHeading
            title="Values We Live By"
            actions={<ActionButtons onView={() => onEditSection?.("values", "view")} onEdit={() => onEditSection?.("values", "edit")} onDelete={() => onDeleteSection?.("values")} />}
          />
          <TableSection
            title={null}
            maxHeight="max-h-56"
            columns={[
              { key: "id", label: "#", width: "w-8 flex-none" },
              { key: "name", label: "Title", width: "w-1/4" },
              { key: "description", label: "Description", width: "flex-1", muted: true },
              { key: "action", label: "Icon/Image", width: "w-20 flex-none", align: "right" },
            ]}
            rows={values}
            renderCell={(row, col) => (col.key === "action" ? <ViewButton onClick={() => onViewPracticeArea?.(row)} /> : row[col.key])}
          />
        </section>

        <section className="flex flex-col gap-2">
          <SectionHeading
            title="Our Promise"
            actions={<ActionButtons onView={() => onEditSection?.("promise", "view")} onEdit={() => onEditSection?.("promise", "edit")} onDelete={() => onDeleteSection?.("promise")} />}
          />
          <ContentCard>{ourPromiseCopy}</ContentCard>
        </section>

        <hr style={{ borderColor: tokens.borderStrong }} />

        <section className="flex flex-col gap-2">
          <SectionHeading
            title="Practice Area"
            actions={<ActionButtons onView={() => onEditSection?.("practiceArea", "view")} onEdit={() => onEditSection?.("practiceArea", "edit")} onDelete={() => onDeleteSection?.("practiceArea")} />}
          />
          <TableSection
            title={null}
            columns={[
              { key: "id", label: "#", width: "w-8 flex-none" },
              { key: "name", label: "Name", width: "w-1/4" },
              { key: "description", label: "Description", width: "flex-1", muted: true },
              { key: "action", label: "Icon/Image", width: "w-20 flex-none", align: "right" },
            ]}
            rows={practiceAreas}
            renderCell={(row, col) => (col.key === "action" ? <ViewButton onClick={() => onViewPracticeArea?.(row)} /> : row[col.key])}
          />
        </section>

        <TableSection
          title="Cases Handled"
          columns={[
            { key: "id", label: "#", width: "w-8 flex-none" },
            { key: "case", label: "Case", width: "flex-1" },
          ]}
          rows={cases}
        />

        <TableSection
          title="Location of Practice"
          columns={[
            { key: "id", label: "#", width: "w-8 flex-none" },
            { key: "location", label: "Location", width: "flex-1" },
          ]}
          rows={locations}
        />

        <TableSection
          title="Awards and Citations"
          columns={[
            { key: "id", label: "#", width: "w-8 flex-none" },
            { key: "category", label: "Category", width: "w-1/4" },
            { key: "title", label: "Title", width: "flex-1", muted: true },
            { key: "year", label: "Year", width: "w-14 flex-none", align: "right" },
          ]}
          rows={awards}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page content composition (drop this inside your existing            */
/* nav/header layout — no NavBar/SidebarNav here anymore)              */
/* ------------------------------------------------------------------ */

export default function LawFirmDetailsPage() {
  return (
    <div className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8" style={{ backgroundColor: tokens.pageBg }}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
        <LawFirmDetailColumn />
        <div className="w-full lg:flex-1">
          <LawFirmDetailsPanel onLiveView={() => console.log("live view")} />
        </div>
      </div>
    </div>
  );
}