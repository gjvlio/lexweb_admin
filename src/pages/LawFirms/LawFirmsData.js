export const tokens = {
  purple: "#5E1B89",
  purpleSoft: "#9D71BC",
  orange: "#F4512C",
  orangeAccent: "#FF7F4D", // Matches Rectangle 47 in Figma
  headerBg: "#F5F5F5",
  border: "#BABABA",
  borderStrong: "#A6A5A5",
  textBody: "#5C5359",
  textDesc: "#464646",
  ink: "#201E1D",
  muted: "#7D7979",
  pageBg: "#F8FFFE",
};

export const demoFirm = {
  id: "123",
  name: "Bautista Law firm Office",
  acronym: "BLO",
  address: "123 Street 456 Baranggay 789 City, Philippines",
  owner: "Eddielyn Joy Bautista",
  email: "sampleemail@gmail.com",
  contact: "09501055888",
};

export const demoLawyers = [
  { id: "123", name: "Eddielyn Joy Bautista", role: "Owner", email: "ejsample@gmail.com", contact: "09507833641" },
  { id: "45", name: "Joy Bautista", role: "Partner", email: "ejsample@gmail.com", contact: "09507833641" },
  { id: "46", name: "Marco Reyes", role: "Associate", email: "mreyes@gmail.com", contact: "09171234567" },
  { id: "47", name: "Liza Fernandez", role: "Associate", email: "lfernandez@gmail.com", contact: "09189876543" },
];

export const demoRatings = [
  { id: "123", raterName: "Eddielyn Joy Bautista", rate: "5", comment: "Great service!", date: "02-09-2026" },
  { id: "45", raterName: "Joy Bautista", rate: "4", comment: "It's ok service.", date: "03-05-2026" },
];

// Based on Figma spec for Assets Panel
export const demoAssets = [
  { id: "123", category: "Eddielyn Joy Bautista", altText: "Owner" },
  { id: "45", category: "Joy Bautista", altText: "Partner" },
  { id: "46", category: "Marco Reyes", altText: "Associate" },
  { id: "47", category: "Liza Fernandez", altText: "Associate" },
];

export const websiteContent = {
  aboutUs:
    'LexMeet is a legal tech company and its name was derived from two words "Lex" and "Meet". "Lex" in Latin means law or related to legal matters while "Meet" is a verb which means to see and speak to (someone) for the first time...',
  mission:
    "Our mission is to bridge the gap between clients and lawyers by giving them the facility and technology to meet and solve their problems.",
  vision:
    "Our vision is to see people seeking legal services without leaving the comforts of their home through technology.",
  promise:
    "With this philosophy, LexMeet was born. That is why we are urging lawyers and clients to LexMeet! Legal advice just a click away!",
  values: [
    { id: 1, name: "We Innovate Legal Solutions", description: "We are always looking for other ways to make legal services convenient..." },
    { id: 2, name: "We Seek Justice Together", description: "Although we are a legal tech company, we are not robots..." },
    { id: 3, name: "We Provide Dignified Services", description: "We put premium to integrity and dignity..." },
  ],
  practiceAreas: [
    { id: 1, name: "Personal & Family Law", description: "Marriage & Annulment, Child custody, Estate Planning" },
    { id: 2, name: "Labor Law", description: "Employment Contracts, Workplace Disputes, Wrongful Termination" },
    { id: 3, name: "Civil Law", description: "Property Disputes, Contract Disputes, Personal Injury" },
  ],
  cases: [
    { id: 1, case: "Abatement of Nuisance" },
    { id: 2, case: "Sample" },
    { id: 3, case: "Sample here too" },
  ],
  locations: [
    { id: 1, location: "Nationwide" },
    { id: 2, location: "Luzon Wide" },
    { id: 3, location: "Visayas Wide" },
  ],
  awards: [
    { id: 1, category: "Special Awards", title: "Best Law Firm in 2020 Women's Rights Cases Category", year: "2020" },
    { id: 2, category: "Citations", title: "University of Santo Tomas, Certificate of Recognition", year: "2021" },
  ],
};