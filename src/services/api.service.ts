export const sensorService = {
    list: "/sensor",
    detail: (id: number) => `/sensor/${id}`,
    create: "/sensor",
    update: (id: number) => `/sensor/${id}`,
    delete: (id: number) => `/sensor/${id}`,
}

export const locationService = {
    list: "/location",
    detail: (id: number) => `/location/${id}`,
    create: "/location",
    update: (id: number) => `/location/${id}`,
    delete: (id: number) => `/location/${id}`,
}

export const cctvService = {
    list: "/cctv",
    detail: (id: number) => `/cctv/${id}`,
    create: "/cctv",
    update: (id: number) => `/cctv/${id}`,
    delete: (id: number) => `/cctv/${id}`,
}

export const floodReportService = {
    list: "/flood/report",
    detail: (id: number) => `/flood/report/${id}`,
    create: "/flood/report",
    update: (id: number) => `/flood/report/${id}`,
    delete: (id: number) => `/flood/report/${id}`,
}

export const floodSpotService = {
    list: "/flood/spot",
    detail: (id: number) => `/flood/spot/${id}`,
    create: "/flood/spot",
    update: (id: number) => `/flood/spot/${id}`,
    delete: (id: number) => `/flood/spot/${id}`,
}

export const alertService = {
    list: "/alert",
    update: (id: number) => `/alert/${id}/read`,
    delete: (id: number) => `/alert/${id}`,
}