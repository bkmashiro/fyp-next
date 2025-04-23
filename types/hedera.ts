export enum TopicType {
  MESSAGE = 'message',
  ARTWORK = 'artwork'
}

export interface HederaService {
  // 提交艺术品证明到区块链
  submitToChain(
    type: TopicType,
    data: {
      proof: any,          // ZK证明数据
      publicSignals: any,  // 公开信号
      artworkHash: string, // 艺术品哈希
      pubKeyHash: string   // 公钥哈希
    }
  ): Promise<void>

  // 查找艺术品记录
  findRecord(
    type: TopicType,
    params: {
      artworkHash: string, // 艺术品哈希
      pubKeyHash: string   // 公钥哈希
    }
  ): Promise<{
    artworkHash: string,
    pubKeyHash: string,
    proof: any,
    publicSignals: any
  } | null>

  // 设置Topic ID
  setTopicId(
    type: TopicType,
    value: string
  ): void

  // 获取Topic ID
  getTopicId(
    type: TopicType
  ): string // 如果不存在会抛出Error

  // 提交消息到区块链
  submitMessage(
    type: TopicType,
    message: string,
    author?: string | null
  ): Promise<string | null> // 返回格式: `${topicId}@${sequenceNumber}` 或 null

  // 提交哈希消息到区块链
  submitHashMessage(
    type: TopicType,
    message: string,
    author?: string | null
  ): Promise<string | null> // 返回格式: `${topicId}@${sequenceNumber}` 或 null

  // 查找消息
  findMessages(
    type: TopicType,
    begin?: Date,
    end?: Date
  ): Promise<Array<{
    message: string,
    seqNo: string
  }>>

  // 验证哈希消息
  validateHashMessage(
    type: TopicType,
    content: string,
    author?: string | null,
    begin?: Date,
    end?: Date
  ): Promise<boolean>
}

// 消息元数据
export interface MessageMeta {
  topicId: string,
  createdAt: Date,
  id: string,
  author: string | null
}

// 区块链交易记录
export interface TransactionRecord {
  topicId: string,
  sequenceNumber: string,
  timestamp: string,
  message: string
} 