
import { IP_POWROZNICZA } from "./constants";
import { customFetch } from "./lib/custom-fetch";
import { CategoryResponse } from "./types/categories";
import { ColumnResponse } from "./types/dystrybucja/columns";
import { MakulatoraResponse } from "./types/dystrybucja/raports";
import { GroupResponse } from "./types/groups";

export const fetchTicketGroupData = async (signal?: AbortSignal): Promise<GroupResponse> => {
    const url = `${IP_POWROZNICZA}:8080/get-groups/`;
    return customFetch<GroupResponse>(url, 'Błąd pobierania grup: Proszę się skontaktować z administratorem.', signal);
};

export async function fetchReportData(filia: string, signal?: AbortSignal) {
    const url = `${IP_POWROZNICZA}:8080/reports/${filia}/`;
    return customFetch<MakulatoraResponse>(url, 'Błąd pobierania makulatury: Proszę się skontaktować z administratorem.', signal);
}

export const fetchReportColumnData = async (filia: string, raportID: string | null, signal?: AbortSignal) => {
    const url = `${IP_POWROZNICZA}:8080/report-details/${filia}/${raportID}/`;
    return customFetch<ColumnResponse>(url, 'Błąd pobierania makulatury: Proszę się skontaktować z administratorem.', signal);
};

export const fetchTicketCategoryData = async (filia: string, signal?: AbortSignal) => {
    const url = `${IP_POWROZNICZA}:8080/categories/${filia}/`;
    return customFetch<CategoryResponse>(url, 'Błąd pobierania kategorii: Proszę się skontaktować z administratorem.', signal);
};

