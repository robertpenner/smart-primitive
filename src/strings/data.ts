/**
 * 💾 Data String Types
 *
 * SmartString types for data format strings.
 */

import { SmartString } from '../SmartPrimitive';

/* ═══════════════════════════════════════════════════════════════
   SERIALIZATION FORMATS
   ═══════════════════════════════════════════════════════════════ */

/**
 * A JSON-formatted string
 *
 * @example
 * const config: JSONString = '{"name":"app","version":"1.0"}';
 */
export type JSONString = SmartString<'JSONString'>;

/**
 * An XML-formatted string
 *
 * @example
 * const doc: XMLString = '<?xml version="1.0"?><root><item>data</item></root>';
 */
export type XMLString = SmartString<'XMLString'>;

/**
 * A YAML-formatted string
 *
 * @example
 * const config: YAMLString = 'name: app\nversion: 1.0\nitems:\n  - one\n  - two';
 */
export type YAMLString = SmartString<'YAMLString'>;

/**
 * A CSV-formatted string
 *
 * @example
 * const data: CSVString = 'name,age,city\nAlice,30,NYC\nBob,25,LA';
 */
export type CSVString = SmartString<'CSVString'>;

/**
 * A Base64-encoded string
 *
 * @example
 * const encoded: Base64String = 'SGVsbG8gV29ybGQ=';
 */
export type Base64String = SmartString<'Base64String'>;

/* ═══════════════════════════════════════════════════════════════
   IDENTIFIER TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * A UUID string
 *
 * @example
 * const id: UUID = '550e8400-e29b-41d4-a716-446655440000';
 */
export type UUID = SmartString<'UUID'>;

/**
 * A ULID string
 *
 * @example
 * const id: ULID = '01ARZ3NDEKTSV4RRFFQ69G5FAV';
 */
export type ULID = SmartString<'ULID'>;

/**
 * A nanoid string
 *
 * @example
 * const id: NanoID = 'V1StGXR_Z5j3eK6b';
 */
export type NanoID = SmartString<'NanoID'>;

/**
 * A slug string (URL-safe identifier)
 *
 * @example
 * const urlPath: Slug = 'my-awesome-article';
 */
export type Slug = SmartString<'Slug'>;

/* ═══════════════════════════════════════════════════════════════
   COMMUNICATION TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * An email address
 *
 * @example
 * const contact: EmailAddress = 'user@example.com';
 */
export type EmailAddress = SmartString<'EmailAddress'>;

/**
 * A phone number
 *
 * @example
 * const phone: PhoneNumber = '+1-555-123-4567';
 */
export type PhoneNumber = SmartString<'PhoneNumber'>;

/**
 * An IP address (v4 or v6)
 *
 * @example
 * const ipv4: IPAddress = '192.168.1.1';
 * const ipv6: IPAddress = '2001:0db8:85a3::8a2e:0370:7334';
 */
export type IPAddress = SmartString<'IPAddress'>;

/**
 * A hostname
 *
 * @example
 * const host: Hostname = 'example.com';
 * const subdomain: Hostname = 'api.example.com';
 */
export type Hostname = SmartString<'Hostname'>;

/* ═══════════════════════════════════════════════════════════════
   DATE/TIME STRINGS
   ═══════════════════════════════════════════════════════════════ */

/**
 * An ISO 8601 date string
 *
 * @example
 * const date: ISODateString = '2024-12-21';
 */
export type ISODateString = SmartString<'ISODateString'>;

/**
 * An ISO 8601 datetime string
 *
 * @example
 * const datetime: ISODateTimeString = '2024-12-21T15:30:45Z';
 */
export type ISODateTimeString = SmartString<'ISODateTimeString'>;

/**
 * A time string (HH:MM:SS)
 *
 * @example
 * const time: TimeString = '15:30:45';
 */
export type TimeString = SmartString<'TimeString'>;

/* ═══════════════════════════════════════════════════════════════
   PATH TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * A file path
 *
 * @example
 * const path: FilePath = '/home/user/documents/file.txt';
 * const winPath: FilePath = 'C:\\Users\\user\\Documents\\file.txt';
 */
export type FilePath = SmartString<'FilePath'>;

/**
 * A directory path
 *
 * @example
 * const dir: DirectoryPath = '/home/user/documents';
 * const winDir: DirectoryPath = 'C:\\Users\\user\\Documents';
 */
export type DirectoryPath = SmartString<'DirectoryPath'>;

/**
 * A file extension (including dot)
 *
 * @example
 * const txtExt: FileExtension = '.txt';
 * const jsExt: FileExtension = '.js';
 */
export type FileExtension = SmartString<'FileExtension'>;
