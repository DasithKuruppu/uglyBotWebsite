export const enum CompanionNames {
  SPINED_DEVIL = `Spined_Devil`,
  TUTOR = `Tutor`,
}
export const enum CompanionTypes {
  DAMAGE = `Damage`,
  DEBUFF = `Debuff`,
  BUFF = `Buff`,
  UTILITY = `Utility`,
  MITIGATION = `Mitigation`,
}

export const CompanionList = [
  {
    label: `Spined Devil`,
    shortName: CompanionNames.SPINED_DEVIL,
    priority: 1,
    type: [CompanionTypes.DEBUFF],
    emoji: {
      id: `1109769146054496296`,
      name: `SpinedDevil`,
      animated: false,
    },
  },
  {
    label: `Tutor`,
    shortName: CompanionNames.TUTOR,
    priority: 1,
    type: [CompanionTypes.BUFF],
    emoji: {
      id: `1109769146054496296`,
      name: `SpinedDevil`,
      animated: false,
    },
  },
];
