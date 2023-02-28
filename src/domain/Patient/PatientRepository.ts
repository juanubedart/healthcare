import { Repository } from "../Repository"
import { Patient } from "./Patient"
export abstract class PatientRepository extends Repository<Patient> {}
