class DBO {
    setSchema(schema) {
        this.schema = schema;
    }

    _createTableCommand() {
        let statements = this.schema.columns.map(column => {
            let statement = [column.name, column.type];

            if (column.notNull) {
                statement.push("NOT NULL");
            } else if (column.default) {
                statement.push(`DEFAULT ${column.default.value}`);
            } 

            return statement.join(" ");
        });

        if (!!this.schema.unique && this.schema.unique.length > 0) {
            statements.push(`UNIQUE (${this.schema.unique.join(", ")})`);
        }

        if (!!this.schema.foreignKeys && this.schema.foreignKeys.length > 0) {
            this.schema.foreignKeys.map(foreignKey => {
                statements.push(`FOREIGN KEY (${foreignKey.field}) REFERENCES ${foreignKey.refTable}(${foreignKey.refField})`);
            });
        }

        if (!!this.schema.primaryKeys && this.schema.primaryKeys.length > 0) {
            statements.push(`PRIMARY KEY (${this.schema.primaryKeys.join(", ")})`);
        }

        return `CREATE TABLE IF NOT EXISTS ${this.schema.tableName} (${statements.join(", ")})`;
    }

    _insertTableCommand(instance) {
        const designatedColumns = this.schema.columns.map(col => col.name);
        
        let terms = [], values = [];
        Object.keys(instance).forEach(key => {
            if (designatedColumns.indexOf(key) >= 0) {
                terms.push(key) && values.push(instance[key]);
            }
        })

        return `INSERT INTO ${this.schema.tableName} (${terms.join(", ")}) VALUES (${values.join(", ")})`;
    }
}

module.exports = {
    DBO
}