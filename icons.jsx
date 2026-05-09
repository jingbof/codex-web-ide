/* Lucide-style icons inline. shadcn convention. */
const Icon = ({ d, size = 16, stroke = 1.6, fill = "none", children, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {d ? <path d={d} /> : children}
  </svg>
);

const IconPlus = (p) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>;
const IconSearch = (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></Icon>;
const IconPlug = (p) => <Icon {...p}><path d="M9 2v6"/><path d="M15 2v6"/><path d="M6 8h12v4a6 6 0 0 1-12 0V8z"/><path d="M12 18v4"/></Icon>;
const IconBolt = (p) => <Icon {...p}><path d="M12 2 4 14h6l-2 8 10-12h-6l2-8Z"/></Icon>;
const IconClock = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>;
const IconPin = (p) => <Icon {...p}><path d="M12 17v5"/><path d="M9 9V3h6v6l3 4H6l3-4Z"/></Icon>;
const IconFolder = (p) => <Icon {...p}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></Icon>;
const IconEdit = (p) => <Icon {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></Icon>;
const IconBranch = (p) => <Icon {...p}><circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 8v8"/><path d="M18 10c0 4-6 4-6 8"/></Icon>;
const IconBranchSm = (p) => <IconBranch size={11} stroke={2} {...p} />;
const IconChevDown = (p) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>;
const IconChevRight = (p) => <Icon {...p}><path d="m9 6 6 6-6 6"/></Icon>;
const IconX = (p) => <Icon {...p}><path d="M18 6 6 18M6 6l12 12"/></Icon>;
const IconCheck = (p) => <Icon {...p}><path d="m5 13 4 4L19 7"/></Icon>;
const IconSettings = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></Icon>;
const IconArrowLeft = (p) => <Icon {...p}><path d="m15 18-6-6 6-6"/></Icon>;
const IconArrowRight = (p) => <Icon {...p}><path d="m9 18 6-6-6-6"/></Icon>;
const IconArrowUp = (p) => <Icon {...p}><path d="M12 19V5M5 12l7-7 7 7"/></Icon>;
const IconCopy = (p) => <Icon {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></Icon>;
const IconThumbUp = (p) => <Icon {...p}><path d="M7 22V11"/><path d="M21 12.5V18a3 3 0 0 1-3 3H7l-4-4V11l4-4V4a2 2 0 0 1 4 0c0 2 1 3 1 5h6a3 3 0 0 1 3 3.5Z"/></Icon>;
const IconThumbDown = (p) => <Icon {...p}><path d="M17 2v11"/><path d="M3 11.5V6a3 3 0 0 1 3-3h11l4 4v6l-4 4v3a2 2 0 0 1-4 0c0-2-1-3-1-5H6a3 3 0 0 1-3-3.5Z"/></Icon>;
const IconShare = (p) => <Icon {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></Icon>;
const IconUndo = (p) => <Icon {...p}><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/></Icon>;
const IconExpand = (p) => <Icon {...p}><path d="M3 9V3h6"/><path d="M21 15v6h-6"/><path d="m21 3-9 9"/><path d="m3 21 9-9"/></Icon>;
const IconMic = (p) => <Icon {...p}><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 19v3"/></Icon>;
const IconRefresh = (p) => <Icon {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/></Icon>;
const IconLaptop = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="11" rx="2"/><path d="M2 20h20"/></Icon>;
const IconPaperclip = (p) => <Icon {...p}><path d="M21 12.5 12 21a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.5 3.5 0 1 1 4.95 4.95L8.34 18A1.5 1.5 0 0 1 6.22 15.88l8.49-8.49"/></Icon>;
const IconRunningGear = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>;
const IconLayers = (p) => <Icon {...p}><path d="m12 2 10 6-10 6L2 8l10-6Z"/><path d="m2 16 10 6 10-6"/><path d="m2 12 10 6 10-6"/></Icon>;
const IconRoute = (p) => <Icon {...p}><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6 16V9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v0"/></Icon>;
const IconGithub = (p) => <Icon {...p}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></Icon>;
const IconBookmark = (p) => <Icon {...p}><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z"/></Icon>;
const IconHash = (p) => <Icon {...p}><path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/></Icon>;
const IconHorizontalDots = (p) => <Icon {...p}><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></Icon>;

Object.assign(window, {
  Icon, IconPlus, IconSearch, IconPlug, IconBolt, IconClock, IconPin, IconFolder, IconEdit,
  IconBranch, IconBranchSm, IconChevDown, IconChevRight, IconX, IconCheck, IconSettings,
  IconArrowLeft, IconArrowRight, IconArrowUp, IconCopy, IconThumbUp, IconThumbDown, IconShare,
  IconUndo, IconExpand, IconMic, IconRefresh, IconLaptop, IconPaperclip, IconRunningGear,
  IconLayers, IconRoute, IconGithub, IconBookmark, IconHash, IconHorizontalDots,
});
