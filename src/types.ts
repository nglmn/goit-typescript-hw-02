type UrlData = {
	regular: string,
	small: string;
}
export type ApiImageKeys = {
	id: string;
	alt_description: string;
	urls: UrlData
} 
export type ImagesTypeObj = {
	results: ApiImageKeys[];
	total_pages: number;
	total: number;
}