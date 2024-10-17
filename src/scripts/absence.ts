const absence: Record<string, () => void> = {};

absence.sortAbsenceColumns = function() {
    const table = document.querySelector("form[path='fravaerelev_fravaersaarsager'] #s_m_Content_Content_FatabAbsenceFravaerGV tbody");
    if (!table) return;

    const elements = Array.from(table.querySelectorAll(" tr:not(:first-child)"));
    if (elements.length === 0) return;

    const sortedElements = elements.reverse();

    elements.forEach((element) => element.remove());
    sortedElements.forEach((element) => table.append(element));
}

Object.keys(absence).forEach(func => absence[func]());