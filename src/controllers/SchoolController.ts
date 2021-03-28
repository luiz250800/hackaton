import { Request, Response} from 'express';
import School from '../database/models/School';

export default class SchoolController {
    async listSchoolsByStateAndCity(request: Request, response: Response) {
        const params = request.params;

        const sgState = params.sgState as string;
        const idCity = Number(params.idCity) as number;

        await School.find({sgState, idCity}).then((list: any) => {
            return response.status(201).json(list)
        }).catch((error: string) => {
            return response.status(500).json({message: `${error}`})
        })
    }

    async store(request: Request, response: Response) {
        const data = request.query;

        const nmSchool = data.nmSchool as string;
        const sgState = data.sgState as string;
        const idCity = Number(data.idCity) as number;
        const nmEndereco = data.nmEndereco as string;
        const nrEndereco = Number(data.nrEndereco) as number;
        
        await new School({nmSchool, sgState, idCity, nmEndereco, nrEndereco}).save().then(() => {
            return response.status(201).json({message: "Escola criada com sucesso"})
          }).catch((error: string) => {
            return response.status(500).json({message: `${error}`})
          })        
    }
}