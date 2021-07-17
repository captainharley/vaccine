export interface SessionsWithDistrictId {
    district_id:number;
    center_id:number;
    name:string;
    address:string;
    state_name:string;
    district_name:string;
    pincode:number;
    from:string;
    to:string;
    fee_type:string;
    date:string;
    available_capacity_dose1:number;
    available_capacity_dose2:number;
    available_capacity:number;
    fee:string;
    min_age_limit:number;
    vaccine:string;
    slots: Array<string>;
}
