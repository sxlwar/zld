
export enum Edu {
   小学,
   初中,
   高中,
   中技,
   中专,
   大专,
   本科,
   硕士,
   博士及以上,
   MBA
}

export interface Certification {
    imageFace: string;
    imageBack: string;
    expire: string;
    mechanism: string;
    identifier: string;
    education: string;
    workType: string;
}

export interface Education {
    expire: string;
    major: string;
    school: string;
    education: string;
}

export interface Family {
    marriage: string;
    children: number;
    marryDay: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyRelation: string;
    addressArea: string;
    addressDetail: string;
}