import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Paslon } from "./Paslon";


@Entity()
export class Partai {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    leader: string;

    @Column()
    no_urut: number;

    @Column()
    visi_misi: string;

    @Column()
    address: string;

    @Column()
    image: string;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;

    @ManyToOne(() => Paslon, (paslon) => paslon.partai)
    paslon: Paslon
}