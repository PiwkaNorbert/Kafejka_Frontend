
import { IP_POWROZNICZA } from "./constants";
import { GetCodesResponse } from "./types/codes";
import { ComputerArray } from "./types/computer";
import { GroupResponse } from "./types/groups";
import { GetWifiCodesResponse } from "./types/wifi-codes";
import { MakulatoraResponse } from "./types/dystrybucja/raports";
import { ColumnResponse } from "./types/dystrybucja/columns";
import { TaskListResponse } from "./types/unauthed-task-list";
import { CategoryResponse } from "./types/categories";
import { customFetch } from "./lib/custom-fetch";


export const fetchHotspotData = async (url: string, filia: string, signal?: AbortSignal): Promise<GetWifiCodesResponse> => {
    const fullUrl = `${url}get-codes/${filia}/`;
    return customFetch<GetWifiCodesResponse>(fullUrl, `Nastpił problem: Fetching hotspot data failed`, signal);
};

export const fetchTicketGroupData = async (signal?: AbortSignal): Promise<GroupResponse> => {
    const url = `${IP_POWROZNICZA}:8080/get-groups/`;
    return customFetch<GroupResponse>(url, 'Błąd pobierania grup: Proszę się skontaktować z administratorem.', signal);
};

export const fetchComputerData = async (url: string, filia: string, signal?: AbortSignal): Promise<ComputerArray> => {
    const fullUrl = `${url}komps/${filia}/`;
    return customFetch<ComputerArray>(fullUrl, 'Błąd pobierania danych z serwera: Proszę się skontaktować z administratorem.', signal);
};

export const fetchJsonCodes = async (signal?: AbortSignal): Promise<GetCodesResponse> => {
    // const url = `${IP_POWROZNICZA}:8000/json-codes/`;
    const url = `http://192.168.200.40:8081/codes`;
    return customFetch<GetCodesResponse>(url, 'Nastpił problem: Fetching JSON codes failed', signal);
};

export async function fetchReportData(filia: string, signal?: AbortSignal) {
    const url = `${IP_POWROZNICZA}:8080/reports/${filia}/`;
    return customFetch<MakulatoraResponse>(url, 'Błąd pobierania makulatury: Proszę się skontaktować z administratorem.', signal);
}

export const fetchReportColumnData = async (filia: string, raportID: string | null, signal?: AbortSignal) => {
    const url = `${IP_POWROZNICZA}:8080/report-details/${filia}/${raportID}/`;
    return customFetch<ColumnResponse>(url, 'Błąd pobierania makulatury: Proszę się skontaktować z administratorem.', signal);
};

export const getTaskList = async (filia: string, signal?: AbortSignal) => {
    const url = `${IP_POWROZNICZA}:8080/unauthorized-tasks/${filia}`;
    return customFetch<TaskListResponse>(url, 'Błąd pobierania kategorii: Proszę się skontaktować z administratorem.', signal);
};

export const fetchTicketCategoryData = async (signal?: AbortSignal) => {
    const url = `${IP_POWROZNICZA}:8080/categories/`;
    return customFetch<CategoryResponse>(url, 'Błąd pobierania kategorii: Proszę się skontaktować z administratorem.', signal);
};
export const addPCAction = async (url: string, filia: string) => {
    const urlAdd = `${url}add-pc/${filia}/`
    return customFetch(urlAdd, 'Niemożna dodać komputera...');
};

export const changeCodeAction = async (url:string) => {
    
    return customFetch(url, 'Niemożna zmienić ilość kodów');
}

