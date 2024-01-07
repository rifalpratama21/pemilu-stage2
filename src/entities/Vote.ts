import { CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Paslon } from "./Paslon";
import { Users } from "./Users";

@Entity()
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Users, (users) => users.vote)
    @JoinColumn()
    users: Users

    @ManyToOne(() => Paslon, (paslon) => paslon.vote)
    paslon: Paslon

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
}