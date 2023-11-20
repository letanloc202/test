import { Express } from 'express';
import expressLoader from './express';

export default ({ expressApp }: { expressApp: Express }): void => {
    expressLoader(expressApp);
};