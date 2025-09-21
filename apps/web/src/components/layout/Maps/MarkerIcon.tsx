export const markerIcon = (logoUrl: string) => {
  const clipId = `clip-${Math.random().toString(36).substr(2, 9)}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><defs><clipPath id="${clipId}"><circle cx="128" cy="128" r="88"/></clipPath></defs><circle cx="128" cy="128" r="120" fill="white" stroke="black" stroke-width="8"/><image href="${logoUrl}" x="40" y="40" width="176" height="176" clip-path="url(#${clipId})" preserveAspectRatio="xMidYMid slice"/></svg>`;

  const base64Svg = btoa(unescape(encodeURIComponent(svg)));

  return {
    url: 'data:image/svg+xml;base64,' + base64Svg,
    scaledSize: new google.maps.Size(48, 48),
    anchor: new google.maps.Point(24, 48),
  };
};
