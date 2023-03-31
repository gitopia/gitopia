import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateReward } from "./types/rewards/tx";
import { MsgClaim } from "./types/rewards/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/gitopia.gitopia.rewards.MsgCreateReward", MsgCreateReward],
    ["/gitopia.gitopia.rewards.MsgClaim", MsgClaim],
    
];

export { msgTypes }