/**
 * 🌐 Network String Types
 *
 * SmartString types for network-related string values.
 *
 * @example
 * // Import and use the branded types to document intent and avoid accidental mix-ups:
 * import { URL, AbsoluteURL, MIMEType } from '../strings/web';
 *
 * const homepage: URL = "https://example.com";
 * const apiEndpoint: AbsoluteURL = "https://api.example.com/v1/users";
 */

import { SmartString } from '../SmartPrimitive';

/* ═══════════════════════════════════════════════════════════════
   URL TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * An absolute URL with protocol (subtype of URL)
 *
 * Must include a protocol (http://, https://, etc.)
 *
 * @example
 * const apiEndpoint: AbsoluteURL = "https://api.example.com/v1/users";
 * const fileLink: AbsoluteURL = "file:///path/to/file.html";
 */
export type AbsoluteURL = SmartString<'AbsoluteURL'>;

/**
 * A relative URL path (subtype of URL)
 *
 * Path-only URL without protocol. Can start with / (root-relative) or not (relative).
 *
 * @example
 * const aboutPath: RelativeURL = "/about/team"; // root-relative
 * const nested: RelativeURL = "./components/button"; // relative
 * const parent: RelativeURL = "../assets/image.png"; // parent-relative
 */
export type RelativeURL = SmartString<'RelativeURL'>;

/**
 * A URL string
 *
 * @example
 * const homepage: URL = "https://example.com";
 */
export type URL = AbsoluteURL | RelativeURL;

/**
 * A data URL (base64 encoded)
 *
 * @example
 * const imageData: DataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...";
 */
export type DataURL = SmartString<'DataURL'>;

/* ═══════════════════════════════════════════════════════════════
   HTTP & CONTENT TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * An HTTP method (GET, POST, PUT, DELETE, PATCH, etc.)
 *
 * @example
 * const getMethod: HTTPMethod = "GET";
 * const postMethod: HTTPMethod = "POST";
 * const deleteMethod: HTTPMethod = "DELETE";
 */
export type HTTPMethod = SmartString<'HTTPMethod'>;

/**
 * A MIME type (media type)
 *
 * @example
 * const jsonType: MIMEType = "application/json";
 * const htmlType: MIMEType = "text/html";
 * const imageType: MIMEType = "image/png";
 */
export type MIMEType = SmartString<'MIMEType'>;
