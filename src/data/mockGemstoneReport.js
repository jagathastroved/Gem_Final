/**
 * Mock Gemstone Report dataset matching the exact shape returned by the astrology backend service.
 */
export const mockGemstoneReportData = {
  user: {
    name: "",
    gender: "Male",
    dob: "15/08/1995",
    tob: "10:30 AM",
    country: "India",
    city: "Chennai",
  },
  lagna: "Taurus",
  lagnaSanskrit: "Vrishabha",
  moonSign: "Sagittarius",
  moonSignSanskrit: "Dhanu",
  star: "Purva Ashadha",
  starPada: "Pada 1",
  nakshatraLord: "Shukra",
  lagnaLord: "Shukra",
  dasha: {
    mahadasha: "Guru",
    mahadashaYears: "2012 – 2028",
    antardasha: "Rahu",
    antardashaYears: "2025 – 2028"
  },
  gemstone: {
    suitableStone: "Emerald",
    sanskritName: "Panna",
    associatedPlanet: "Mercury (Budha)",
    badgeText: "Recommended for You",
    description: "Emerald strengthens Mercury's supportive influence in your chart and is recommended based on your Taurus Lagna and Anukula method.",
    whyThisStone: [
      { id: "01", title: "Planetary Support", text: "Mercury acts as a supportive planet in your chart." },
      { id: "02", title: "House Connection", text: "Mercury influences important houses connected to your life direction." },
      { id: "03", title: "Dasha Relevance", text: "Your current planetary period makes Mercury's influence especially relevant." },
      { id: "04", title: "Gemstone Logic", text: "Emerald is traditionally associated with strengthening Mercury." }
    ]
  },
  comparison: {
    genericSaying: "“You are Sagittarius Moon. Wear Yellow Sapphire.”",
    genericSubtext: "Based on: Sagittarius Moon sign (Rashi-based)",
    actualChartSaying: "Guru (Jupiter) Yellow Sapphire is not recommended for routine wear.",
    actualChartText: "Wearing Yellow Sapphire may amplify this planet's harmful patterns in your chart.",
    recommendationLabel: "Our Recommendation: Emerald",
    recommendationMethod: "Taurus (Vrishabha) Lagna • Anukula method"
  },
  avoidGemstones: [
    {
      id: "coral",
      name: "Red Coral",
      planet: "Mars",
      reason: "Red Coral is not recommended for routine wear.",
      color: "#D1483F",
      type: "Red Coral"
    },
    {
      id: "yellow_sapphire",
      name: "Yellow Sapphire",
      planet: "Jupiter",
      reason: "Yellow Sapphire is not recommended for routine wear.",
      color: "#E5A93C",
      type: "Yellow Sapphire"
    },
    {
      id: "cats_eye",
      name: "Cat's Eye",
      planet: "Ketu",
      reason: "Cat's Eye is not recommended for routine wear.",
      color: "#8C7A3E",
      type: "Cat's Eye"
    }
  ],
  timeline: {
    keyInsights: [
      {
        id: "01",
        title: "Around 2012, your life direction likely shifted under Jupiter mahadasha.",
        source: "Jupiter Mahadasha transition"
      },
      {
        id: "02",
        title: "Mercury is one of the clearest support planets in your chart, so its themes show up repeatedly in work and life decisions.",
        source: "Mercury support signature"
      },
      {
        id: "03",
        title: "Foreign, unconventional, or career-amplifying experiences are likely to matter more than average in this chart.",
        source: "Rahu assessment"
      }
    ],
    events: [
      {
        id: "ev1",
        title: "Guru Mahadasha Begins",
        subtext: "A major phase of growth and expansion.",
        active: false,
        icon: "guru"
      },
      {
        id: "ev2",
        title: "Rahu Antardasha Begins",
        subtext: "A period of transformation and new directions.",
        active: true,
        icon: "rahu"
      },
      {
        id: "ev3",
        title: "Guru Mahadasha Ends",
        subtext: "A new chapter of life begins.",
        active: false,
        icon: "guru_end"
      }
    ]
  },
  wearingGuide: {
    rattiWeight: "5.25 - 6.5 Ratti",
    metal: "Panchadhatu or Gold",
    finger: "Little finger (Pinky) of working hand",
    dayAndTime: "Wednesday morning during Shukla Paksha",
    mantra: "Om Bum Budhaya Namaha (108 times)",
    combinationsToAvoid: "Avoid wearing with Red Coral or Pearl."
  }
};

export function getMockReportByDetails(birthDetails) {
  const base = JSON.parse(JSON.stringify(mockGemstoneReportData));
  if (birthDetails) {
    base.user = { ...base.user, ...birthDetails };
    if (birthDetails.weightKg) {
      const w = parseFloat(birthDetails.weightKg) || 70;
      const rattiMin = (w / 12).toFixed(2);
      const rattiMax = ((w / 12) + 1.25).toFixed(2);
      base.wearingGuide.rattiWeight = `${rattiMin} - ${rattiMax} Ratti (Calculated for ${w}kg)`;
    }
  }
  return base;
}
