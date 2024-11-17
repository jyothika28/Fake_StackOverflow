const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const getMetaData = (date: Date): string => {
  const now = new Date();
  const diffs = Math.floor(Math.abs(now.getTime() - date.getTime()) / 1000);

  if (diffs < 60) {
    return `${diffs} seconds ago`;
  } else if (diffs < 60 * 60) {
    return `${Math.floor(diffs / 60)} minutes ago`;
  } else if (diffs < 60 * 60 * 24) {
    const h = Math.floor(diffs / 3600);
    return `${h} hours ago`;
  } else if (diffs < 60 * 60 * 24 * 365) {
    return `${months[date.getMonth()]} ${getDateHelper(date)} at ${date
      .toTimeString()
      .slice(0, 8)}`;
  } else {
    return `${months[date.getMonth()]} ${getDateHelper(
      date
    )}, ${date.getFullYear()} at ${date.toTimeString().slice(0, 8)}`;
  }
};

const getDateHelper = (date: Date): string => {
  const day = date.getDate();
  if (day < 10) {
    return `0${day}`;
  }
  return `${day}`;
};

const validateHyperlink = (text: string): boolean => {
  const hyperlinkPattern = /\[([^\]]*)\]\(([^)]*)\)/g;

  // Find all matches for hyperlinks in the text
  const matches = [...text.matchAll(hyperlinkPattern)];

  // If there are no matches, it's valid
  if (matches.length === 0) {
    return true;
  }

  // Check each match to see if the URL starts with https://
  for (const match of matches) {
    if (
      !match[1].length ||
      !match[2].length ||
      !match[2].startsWith("https://") ||
      !match[2].slice(8).length
    ) {
      return false;
    }
  }

  return true;
};

const handleHyperlink = (text = ""): JSX.Element => {
  const pattern = /\[([^\]]*)\]\(([^)]*)\)/g;

  const replacedText = text.replace(
    pattern,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  return <div dangerouslySetInnerHTML={{ __html: replacedText }} />;
};

export { getMetaData, handleHyperlink, validateHyperlink };
