// get-offers.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

/** Common “decimal as string” convention to preserve precision (e.g., numeric(24,12)) */
// Prefer string for currency/ratios/APR to avoid JS float issues.

export enum RequestType {
  SCORING = 'SCORING',
  ALLOCATION = 'ALLOCATION',
  INCOME_VERIFICATION = 'INCOME_VERIFICATION',
}

export enum VerificationReason {
  INCOME = 'INCOME',
  COLLATERAL = 'COLLATERAL',
}

export enum AssetType {
  LOAN = 'LOAN', // Personal loan
  MASTER_LINE = 'MASTER_LINE', // Upgrade Card
}

export enum ApplicationPurpose {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBT_CONSOLIDATION = 'DEBT_CONSOLIDATION',
  SMALL_BUSINESS = 'SMALL_BUSINESS',
  HOME_IMPROVEMENT = 'HOME_IMPROVEMENT',
  LARGE_PURCHASE = 'LARGE_PURCHASE',
  OTHER = 'OTHER',
}

export enum Channel {
  DIRECT_MAIL = 'DIRECT_MAIL',
  DIRECT_MAIL_CUSTOM = 'DIRECT_MAIL_CUSTOM',
  OTHER = 'OTHER',
  CREDIT_KARMA_LIGHTBOX = 'CREDIT_KARMA_LIGHTBOX',
  CREDIT_KARMA_OTHER = 'CREDIT_KARMA_OTHER',
}

export class ApplicationInformationDto {
  @ApiProperty({ enum: AssetType })
  @IsEnum(AssetType)
  assetType!: AssetType;

  @ApiProperty({
    description: 'Desired amount; numeric(24,12) represented as string',
    example: '15000.00',
  })
  @IsString()
  desiredAmount!: string;

  @ApiProperty({
    enum: ApplicationPurpose,
    description: 'When assetType is MASTER_LINE, this defaults to OTHER.',
  })
  @IsEnum(ApplicationPurpose)
  purpose!: ApplicationPurpose;

  @ApiProperty({ enum: Channel })
  @IsEnum(Channel)
  channel!: Channel;
}

export class OfferInformationDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  uuid!: string;

  @ApiProperty({ description: 'numeric(24,2) as string', example: '10000.00' })
  @IsString()
  offerAmount!: string;

  @ApiProperty({ description: 'Term in months', example: 36 })
  @IsInt()
  offerTerm!: number;

  @ApiProperty({
    description: 'APR % as string numeric(24,12)',
    example: '19.68',
  })
  @IsString()
  apr!: string;

  @ApiProperty({
    description: 'Interest rate % as string numeric(24,12)',
    example: '15.99',
  })
  @IsString()
  interestRate!: string;

  @ApiProperty({
    description: 'Monthly payment numeric(24,2) as string',
    example: '352.45',
  })
  @IsString()
  monthlyPayment!: string;

  @ApiPropertyOptional({ description: "true if Upgrade's primary offer" })
  @IsOptional()
  @IsBoolean()
  defaultOffer?: boolean;

  @ApiPropertyOptional({
    description:
      'Debt-to-income including offered loan; numeric(24,12) as string',
    example: '0.38',
  })
  @IsOptional()
  @IsString()
  postloanDtiIndividual?: string;

  @ApiPropertyOptional({
    description: 'DTI including additional income; numeric(24,12) as string',
    example: '0.34',
  })
  @IsOptional()
  @IsString()
  postloanDtiIndividualWithAdditional?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  directPayRequired?: boolean;

  @ApiPropertyOptional({ isArray: true, enum: ['DIRECT_PAY'] })
  @IsOptional()
  @IsArray()
  discounts?: string[];
}

export enum AdverseReasonSource {
  core = 'core', // CORE adverse action reason(s)
  upginternalscore4 = 'upginternalscore4', // Upgrade Internal Risk Score 4 reasons
}

export class AdverseActionReasonDto {
  @ApiProperty({ enum: AdverseReasonSource })
  @IsEnum(AdverseReasonSource)
  source!: AdverseReasonSource;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ maxLength: 1024 })
  @IsOptional()
  @IsString()
  description?: string;
}

export enum PaySchedule {
  bimonthly = 'bimonthly',
  daily = 'daily',
  hourly = 'hourly',
  monthly = 'monthly',
  semimonthly = 'semimonthly',
  weekly = 'weekly',
  yearly = 'yearly',
}

export class EmploymentIncomeDto {
  @ApiProperty({ enum: PaySchedule })
  @IsEnum(PaySchedule)
  @IsOptional()
  paySchedule?: PaySchedule;

  @ApiProperty({
    description: 'Amount of income; numeric(24,12) as string',
    example: '82000.00',
    required: false,
  })
  @IsOptional()
  @IsString()
  amount?: string;
}

export class EmploymentHistoryItemDto {
  @ApiPropertyOptional({ maxLength: 256 })
  @IsOptional()
  @IsString()
  employerName?: string;

  @ApiPropertyOptional({ maxLength: 256 })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiPropertyOptional({ format: 'date' })
  @IsOptional()
  @IsDateString()
  dateHired?: string;

  @ApiPropertyOptional({ format: 'date' })
  @IsOptional()
  @IsDateString()
  dateTerminated?: string;

  @ApiPropertyOptional({
    format: 'date',
    description: 'Date this info was last verified',
  })
  @IsOptional()
  @IsDateString()
  dateEffective?: string;

  @ApiPropertyOptional({
    format: 'date',
    description: 'First reported to TransUnion',
  })
  @IsOptional()
  @IsDateString()
  dateOnFileSince?: string;

  @ApiPropertyOptional({ description: 'Years/months worked (integer count)' })
  @IsOptional()
  @IsInt()
  duration?: number;

  @ApiPropertyOptional({ type: () => EmploymentIncomeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmploymentIncomeDto)
  income?: EmploymentIncomeDto;

  @ApiPropertyOptional({ maxLength: 256 })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export enum AddressStatus {
  current = 'current',
  previous = 'previous',
  secondPrevious = 'secondPrevious',
  future = 'future',
}

export enum Directional {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W',
  NE = 'NE',
  SE = 'SE',
  NW = 'NW',
  SW = 'SW',
}

export class UnitDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  number?: string;
}

export class StreetDto {
  @ApiPropertyOptional({ description: 'Hashed house/PO box number' })
  @IsOptional()
  @IsString()
  numberHash?: string;

  @ApiPropertyOptional({
    description: 'Hashed street / rural route / PO box text',
  })
  @IsOptional()
  @IsString()
  nameHash?: string;

  @ApiPropertyOptional({ enum: Directional })
  @IsOptional()
  @IsEnum(Directional)
  preDirectional?: Directional;

  @ApiPropertyOptional({ enum: Directional })
  @IsOptional()
  @IsEnum(Directional)
  postDirectional?: Directional;

  @ApiPropertyOptional({
    description: 'Primary street type (per TU codes)',
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ type: () => UnitDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UnitDto)
  unit?: UnitDto;
}

export class LocationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'State code (per TU codes)' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'First three digits of ZIP code' })
  @IsOptional()
  @IsString()
  zipCode?: string;
}

export enum ResidenceStatus {
  own = 'own',
  rent = 'rent',
  board = 'board',
}

export class ResidenceDto {
  @ApiPropertyOptional({ enum: ResidenceStatus })
  @IsOptional()
  @IsEnum(ResidenceStatus)
  status?: ResidenceStatus;
}

export class AddressHistoryItemDto {
  @ApiPropertyOptional({ enum: AddressStatus })
  @IsOptional()
  @IsEnum(AddressStatus)
  status?: AddressStatus;

  @ApiPropertyOptional({ format: 'date' })
  @IsOptional()
  @IsDateString()
  dateReported?: string;

  @ApiPropertyOptional({ type: () => StreetDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => StreetDto)
  street?: StreetDto;

  @ApiPropertyOptional({ type: () => LocationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @ApiPropertyOptional({ type: () => ResidenceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ResidenceDto)
  residence?: ResidenceDto;

  @ApiPropertyOptional({
    description: 'Length in years at the address (free-form)',
  })
  @IsOptional()
  @IsString()
  duration?: string;
}

export class CreditInformationDto {
  @ApiProperty({ description: 'FICO 9 (3-digit integer)' })
  @IsInt()
  fico9!: number;
}

export enum CreditAttributeSource {
  UPGRADE_INTERNAL = 'UPGRADE_INTERNAL',
  TRANSUNION = 'TRANSUNION',
  IDA_FCRA = 'IDA_FCRA',
  LEXIS_NEXIS = 'LEXIS_NEXIS',
}

export class CreditAttributeDto {
  @ApiProperty({ enum: CreditAttributeSource })
  @IsEnum(CreditAttributeSource)
  source!: CreditAttributeSource;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: { type: 'string' },
    description: 'numeric(24,12) values as strings',
  })
  @IsOptional()
  numericAttributes?: Record<string, string>;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: { type: 'boolean' },
  })
  @IsOptional()
  booleanAttributes?: Record<string, boolean>;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  @IsOptional()
  textAttributes?: Record<string, string>;
}

export class CreditInformationBySourceDto {
  @ApiPropertyOptional({ minimum: 1, maximum: 6 })
  @IsOptional()
  @IsInt()
  upgFtr1Bin?: number;

  @ApiPropertyOptional({
    description: 'Container; Upgrade uses `creditAttributes` array by source',
  })
  @IsOptional()
  creditInformationBySource?: string;

  @ApiProperty({ type: () => [CreditAttributeDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreditAttributeDto)
  creditAttributes: CreditAttributeDto[];
}

export enum PriorLoanStatus {
  OPEN = 'OPEN',
  CLOSED_PAIDOFF = 'CLOSED_PAIDOFF',
  CLOSED_CANCEL = 'CLOSED_CANCEL',
  CLOSED_CHARGEOFF = 'CLOSED_CHARGEOFF',
}

export class PriorLoanInformationItemDto {
  @ApiProperty({ enum: AssetType })
  @IsEnum(AssetType)
  assetType!: AssetType;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  applicationUuid!: string;

  @ApiProperty({ format: 'date', description: 'Contract / originated date' })
  @IsDateString()
  contractDate!: string;

  @ApiProperty({ description: 'BigDecimal as string' })
  @IsString()
  balance!: string;

  @ApiProperty({ enum: PriorLoanStatus })
  @IsEnum(PriorLoanStatus)
  status!: PriorLoanStatus;
}

export class VehicleInformationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  year?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  make?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  trim?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  mileage?: number;

  @ApiPropertyOptional({ description: 'BigDecimal as string' })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  confirmedCollateral?: boolean;

  @ApiPropertyOptional({ description: 'BigDecimal as string' })
  @IsOptional()
  @IsString()
  existingLoanOriginalBalance?: string;

  @ApiPropertyOptional({ description: 'BigDecimal as string' })
  @IsOptional()
  @IsString()
  existingLoanPayoffRemainingBalance?: string;

  @ApiPropertyOptional({ description: 'BigDecimal as string' })
  @IsOptional()
  @IsString()
  existingLoanMonthlyPayment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  existingLoanTerm?: number;

  @ApiPropertyOptional({ format: 'date' })
  @IsOptional()
  @IsDateString()
  existingLoanOpenDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  existingLoanPayments?: number;
}

/** ===== Top-level Request/Response DTOs ===== */

export class GetOffersRequestDto {
  @ApiProperty({ format: 'uuid', description: 'uuid/v4' })
  @IsUUID()
  requestUuid!: string;

  @ApiProperty({ enum: RequestType })
  @IsEnum(RequestType)
  requestType!: RequestType;

  @ApiProperty({ format: 'uuid', description: 'uuid/v4' })
  @IsUUID()
  applicationUuid!: string;

  @ApiPropertyOptional({
    type: 'array',
    isArray: true,
    enum: VerificationReason,
  })
  @IsOptional()
  @IsArray()
  verificationReasons?: VerificationReason[];

  @ApiProperty({ type: () => ApplicationInformationDto })
  @ValidateNested()
  @Type(() => ApplicationInformationDto)
  applicationInformation!: ApplicationInformationDto;

  @ApiPropertyOptional({ type: () => [OfferInformationDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfferInformationDto)
  offerInformation?: OfferInformationDto[];

  @ApiPropertyOptional({ type: () => [AdverseActionReasonDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdverseActionReasonDto)
  adverseActionReasons?: AdverseActionReasonDto[];

  @ApiPropertyOptional({ type: () => [EmploymentHistoryItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmploymentHistoryItemDto)
  employmentHistory?: EmploymentHistoryItemDto[];

  @ApiPropertyOptional({ type: () => [AddressHistoryItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressHistoryItemDto)
  addressHistory?: AddressHistoryItemDto[];

  @ApiPropertyOptional({ type: () => CreditInformationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreditInformationDto)
  creditInformation?: CreditInformationDto;

  @ApiPropertyOptional({ type: () => CreditInformationBySourceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreditInformationBySourceDto)
  creditInformationBySource?: CreditInformationBySourceDto;

  @ApiPropertyOptional({ type: () => [PriorLoanInformationItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriorLoanInformationItemDto)
  priorLoanInformation?: PriorLoanInformationItemDto[];

  @ApiPropertyOptional({ type: () => VehicleInformationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VehicleInformationDto)
  vehicleInformation?: VehicleInformationDto;

  @ApiPropertyOptional({
    type: () => [OfferInformationDto],
    description: 'Primary/core offers',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfferInformationDto)
  coreOfferInformation?: OfferInformationDto[];
}

// ====== Enums ======
export enum DecisionStatus {
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}

// ====== Nested DTOs ======

export class OfferScoreDto {
  @ApiProperty({ description: 'Offer scoring model name' })
  @IsString()
  modelName!: string;

  @ApiProperty({ description: 'Offer scoring value, numeric(36,24) as string' })
  @IsString()
  score!: string;
}

export class AllocatedInvestmentAccountDto {
  @ApiProperty({ description: 'Unique identifier of the investment account' })
  @IsString()
  number!: string;

  @ApiProperty({ description: 'Name of the investment account' })
  @IsString()
  name!: string;
}

export class ResultDetailDto {
  @ApiProperty({ description: 'Custom field name' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Custom field value', maxLength: 1024 })
  @IsString()
  value!: string;
}

export class OfferDecisionDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  uuid!: string;

  @ApiPropertyOptional({
    description: 'Interest rate assigned by model, numeric(24,12) as string',
  })
  @IsOptional()
  @IsString()
  interestRate?: string;

  @ApiPropertyOptional({
    description: 'Internal offer score, numeric(36,24) as string',
  })
  @IsOptional()
  @IsString()
  score?: string;

  @ApiProperty({ enum: DecisionStatus })
  @IsEnum(DecisionStatus)
  decisionStatus!: DecisionStatus;

  @ApiPropertyOptional({ type: () => [OfferScoreDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfferScoreDto)
  scores?: OfferScoreDto[];

  @ApiPropertyOptional({ type: () => AllocatedInvestmentAccountDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AllocatedInvestmentAccountDto)
  allocatedInvestmentAccount?: AllocatedInvestmentAccountDto;

  @ApiPropertyOptional({ type: () => [ResultDetailDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResultDetailDto)
  resultDetails?: ResultDetailDto[];
}

export class AdverseActionReasonResponseDto {
  @ApiProperty()
  @IsString()
  code!: string;

  @ApiProperty({ maxLength: 1024 })
  @IsString()
  description!: string;
}

// ====== Main Response DTO ======
export class GetOffersResponseDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  applicationUuid!: string;

  @ApiPropertyOptional({ description: 'Your offer model name' })
  @IsOptional()
  @IsString()
  modelName?: string;

  @ApiPropertyOptional({ description: 'Your credit policy version' })
  @IsOptional()
  @IsString()
  policyVersion?: string;

  @ApiPropertyOptional({
    description: 'Your test cell (e.g. pricing test cell)',
  })
  @IsOptional()
  @IsString()
  testCell?: string;

  @ApiProperty({
    type: () => [OfferDecisionDto],
    description:
      'Your decision result for each individual offer sent on the request.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfferDecisionDto)
  offers!: OfferDecisionDto[];

  @ApiPropertyOptional({
    type: () => [AdverseActionReasonResponseDto],
    description:
      'Adverse action reasons if no offers are taken. Required if no purchase intent.',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdverseActionReasonResponseDto)
  adverseActionReasons?: AdverseActionReasonResponseDto[];
}
