export const ESTATE_ITEMS = [
  { id: 'beneficiaries', title: 'Beneficiaries Assigned', detail: 'Primary/Contingent named on all retirement accounts.' },
  { id: 'tod', title: 'POD/TOD Activated', detail: 'Checking, savings, and taxable brokerages have Transfer-On-Death.' },
  { id: 'will', title: 'Will / Trust Active', detail: 'Executed documents outlining asset distribution (and guardians if applicable).' },
  { id: 'directives', title: 'Advance Directives', detail: 'Financial POA and Medical Proxy officially named.' },
]

/**
 * Count the checklist items marked done. `checks` maps item id to a
 * boolean; ids that are not in the list are ignored.
 */
export function estateScore(checks, items = ESTATE_ITEMS) {
  const score = items.filter((item) => checks[item.id]).length
  return { score, total: items.length, complete: score === items.length }
}
