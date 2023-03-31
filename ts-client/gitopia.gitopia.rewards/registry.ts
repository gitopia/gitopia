import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgClaim } from "./types/rewards/tx";
import { MsgCreateReward } from "./types/rewards/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/gitopia.gitopia.rewards.MsgClaim", MsgClaim],
    ["/gitopia.gitopia.rewards.MsgCreateReward", MsgCreateReward],
    
];

export { msgTypes }