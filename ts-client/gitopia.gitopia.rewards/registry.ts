import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgClaim } from "./types/gitopia/gitopia/rewards/tx";
import { MsgUpdateParams } from "./types/gitopia/gitopia/rewards/tx";
import { MsgCreateReward } from "./types/gitopia/gitopia/rewards/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/gitopia.gitopia.rewards.MsgClaim", MsgClaim],
    ["/gitopia.gitopia.rewards.MsgUpdateParams", MsgUpdateParams],
    ["/gitopia.gitopia.rewards.MsgCreateReward", MsgCreateReward],
    
];

export { msgTypes }