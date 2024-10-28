const home: Record<string, () => void> = {};

home.absenceText = function() {
    const container = document.querySelector("#s_m_Content_Content_RegistreringerInfo");
    if (!container) return;

    const absenceElement: HTMLSpanElement | null = container.querySelector("td:nth-child(2) a span");
    const lecturesElement = container.querySelector("td:last-child");
    if (!absenceElement || !lecturesElement) return;

    const lectures = parseInt(lecturesElement.textContent || "0");
    const text = lectures > 1 ? "moduler" : "modul";
    absenceElement.textContent = `${lectures} ${text} mangler fraværsårsag`;
}

Object.keys(home).forEach(func => home[func]());
